"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {Cloudinary} from "@cloudinary/url-gen";
import * as faceApi from "face-api.js";
import { useApp } from "@/contexts/contextApi";
import Image from "next/image";
import {Resize} from '@cloudinary/url-gen/actions/resize';
const PhotoModal = () => {
  const { photoModal, user,setPhotoModal } = useApp();
  const [photoUrl, setPhotoUrl] = useState("");
  const videoRef = useRef<HTMLVideoElement>(document.createElement("video"));
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"));
  const circleRef = useRef<HTMLDivElement>(document.createElement("div"));
  const isFaceCenteredRef = useRef<boolean>(false);

  const loadModels = useCallback(async () => {
    console.log("Carregando modelos...");
    const MODEL_URL = "/models";
    try {
      await faceApi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      console.log("Modelos carregados com sucesso.");
    } catch (error) {
      console.error("Erro ao carregar modelos:", error);
      console.error("A detecção facial não funcionará corretamente.");
    }
  }, []);

  const startVideo = useCallback(async () => {
    console.log("Iniciando vídeo...");
    const video = videoRef.current;
    if (video) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        video.srcObject = stream;
        console.log("Vídeo iniciado com sucesso.");
      } catch (err) {
        console.error("Erro ao iniciar o vídeo:", err);
      }
    }
  }, []);

  const takePhoto = async () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photoDataUrl = canvas.toDataURL("image/jpeg");

        // Define a URL da foto capturada
        setPhotoUrl(photoDataUrl);
      }
    }
  };

    const uploadPhotoToCloudinary = async (photoDataUrl: any) => {
        if(!user) return;

        const response = await fetch('https://api.cloudinary.com/v1_1/dgha3j8nj/upload', {
            method: 'POST',
            body: JSON.stringify({
                file: photoDataUrl,
                upload_preset: 'ml_default',
                folder: 'teste',
                public_id: user.name
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })

        const data = await response.json();
        console.log(data);
        



        
        
        setPhotoUrl("");
        setPhotoModal(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("play", async () => {
        const canvas = canvasRef.current;
        const displaySize = { width: 300, height: 225 };
        faceApi.matchDimensions(canvas, displaySize);

        const updateFaceRecognition = async () => {
          canvas
            ?.getContext("2d")
            ?.clearRect(0, 0, canvas.width, canvas.height);

          const circle = circleRef.current;
          const context = canvas?.getContext("2d");

          if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height);

            const circleCenterX =
              circle?.getBoundingClientRect().left +
              circle?.getBoundingClientRect().width / 2;
            const circleCenterY =
              circle?.getBoundingClientRect().top +
              circle?.getBoundingClientRect().height / 2;
            const circleRadius = circle?.getBoundingClientRect().width / 2;

            context.beginPath();
            context.arc(
              circleCenterX,
              circleCenterY,
              circleRadius,
              0,
              2 * Math.PI
            );
            context.strokeStyle = isFaceCenteredRef.current ? "white" : "red";
            context.lineWidth = 2;
            context.stroke();
          }
          requestAnimationFrame(updateFaceRecognition);
        };

        updateFaceRecognition();
      });
    }
  }, []);

  useEffect(() => {
    if (!photoModal) return;

    loadModels()
      .then(() => startVideo())
      .catch((error) => {
        console.error("Erro durante o carregamento:", error);
      });
  }, [loadModels, startVideo, photoModal]);

  if (!photoModal) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="absolute w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto bg-white  max-h-full p-5 flex flex-col justify-center items-center text-center gap-5">
        <h2>
          {photoUrl
            ? "Foto Capturada:"
            : "Posicione o círculo na sua cabeça e centralize-a na câmera"}
        </h2>

        <div className="w-[300px] h-[225px] relative">
          {photoUrl ? (
            <div>
              <Image
                src={photoUrl}
                alt="Foto Capturada"
                width={300}
                height={225}
              />
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                style={{
                  border: "1px solid black",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                }}
              />
              <canvas
                ref={canvasRef}
                width="300"
                height="225"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
              <div
                ref={circleRef}
                className={`w-[120px] h-[120px] bg-transparent border-2 rounded-full cursor-move border-white`}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </>
          )}
        </div>

        {!photoUrl ? (
          <button
            className={`bg-blue-500 text-white rounded-md px-3 py-2 hover:bg-blue-600 transition duration-200 ease-in-out`}
            onClick={takePhoto}
          >
            Capturar Foto
          </button>
        ) : (
          <div>
            <button
              className={`bg-blue-500 text-white rounded-md px-3 py-2 hover:bg-blue-600 transition duration-200 ease-in-out`}
              onClick={() => setPhotoUrl("")}
            >
              Tirar outra foto
            </button>
            <button
              className={`bg-blue-500 text-white rounded-md px-3 py-2 hover:bg-blue-600 transition duration-200 ease-in-out`}
              onClick={() => {
                uploadPhotoToCloudinary(photoUrl);
              }}
            >
              Enviar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoModal;
