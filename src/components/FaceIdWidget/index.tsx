"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as faceApi from "face-api.js";
import { useApp } from "@/contexts/contextApi";
import * as cloudinary from "cloudinary-core";
import CloseIcon from "@/assets/icons/CloseIcon";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function FaceIdWidget() {
  const { recognitionModal, setRecognitionModal,setUser } = useApp();
  const [videoLoading, setVideoLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(
    null
  );
  const canvasRef = useRef<HTMLCanvasElement>(
    null
  );
  const [faceMatcher, setFaceMatcher] = useState<faceApi.FaceMatcher | null>(
    null
  );
  
  const router = useRouter()
  
  // const getFacesFromCloudinary = useCallback(async () => {
  //   // all files that start with "teste/"
  //   const response = await axios.get(
  //     "https://res.cloudinary.com/dppimfdxy/image/list/faces.json",
  //     {
  //       headers: {
  //         'Authorization': `Bearer 893146136213397`,
  //         'Access-Control-Allow-Origin': '*',
  //       }
  //     }
  //   );
  //   console.log('faces from cloudinary', response.data)
  // }, []);

  // useEffect(() => {
  //   getFacesFromCloudinary();
  // }, []);

  const loadModels = useCallback(async () => {
    console.log("Carregando modelos...");
    setVideoLoading(true);
    const MODEL_URL = "/models";
    try {
      await faceApi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      console.log("Modelos carregados com sucesso.");

      const resFacesList = await fetch('/api/face/all',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      
      const resList = await resFacesList.json()
      
      const augmentedMockFacesList =
        (await facesListInDifferentAngles(resList)) || [];

      console.log("Lista de faces mockadas:", augmentedMockFacesList);

      const labeledMockFaceDescriptors = augmentedMockFacesList.map((face) => {
        return new faceApi.LabeledFaceDescriptors(
          face.name,
          face.descriptors.flat()
        );
      });

      console.log("Descritores de faces mockadas:", labeledMockFaceDescriptors);

      const labeledMockFaceDescriptorsResolved = await Promise.all(
        labeledMockFaceDescriptors
      );

      console.log(
        "Descritores de faces mockadas resolvidos:",
        labeledMockFaceDescriptorsResolved
      );

      if (labeledMockFaceDescriptorsResolved.length > 0) {
        const faceMatcher = new faceApi.FaceMatcher(
          labeledMockFaceDescriptorsResolved,
          0.6
        );

        setFaceMatcher(faceMatcher);


      }
    } catch (error) {
      console.error("Erro ao carregar modelos:", error);
      console.error("A detecção facial não funcionará corretamente.");
    } finally {
      setVideoLoading(false);
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

  const getFacesList = async () => {
    try {
      const cloudinaryCore = new cloudinary.Cloudinary({
        cloud_name: "dppimfdxy",
        api_key: "893146136213397",
        api_secret: "vHvFad6vFvYL2fSzZXtl38ahSMQ",
        secure: true,
      });

      const response = await fetch(cloudinaryCore.url("faces.json"));
      const facesList = await response.json();
      return facesList; // Adiciona o retorno da lista de faces
    } catch (error) {
      console.error("Erro ao obter a lista de faces:", error);
      return []; // Retorna uma lista vazia em caso de erro
    }
  };

  // Função para criar descritores em diferentes ângulos e orientações
  const facesListInDifferentAngles = async (facesList: any) => {
    const augmentedDescriptors = [];

    for (const face of facesList) {
      const augmentedFace = { ...face };
      augmentedFace.descriptors = [];

      for (const url of face.descriptors) {
        const img = await faceApi.fetchImage(url);
        const detections = await faceApi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detections) {
          augmentedFace.descriptors.push(detections.descriptor);

          // Adicione variações de ângulo ou orientação aqui
          // Exemplo: Rotacionar a imagem e adicionar novos descritores
          const rotatedImage = faceApi.createCanvasFromMedia(img);
          const ctx = rotatedImage.getContext("2d");
          if (!ctx) return;
          ctx.translate(img.width / 2, img.height / 2);
          ctx.rotate(Math.PI / 4); // Ângulo de rotação em radianos
          ctx.drawImage(
            img,
            -img.width / 2,
            -img.height / 2,
            img.width,
            img.height
          );

          const rotatedDetections = await faceApi
            .detectSingleFace(rotatedImage)
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (rotatedDetections) {
            augmentedFace.descriptors.push(rotatedDetections.descriptor);
          }
        }
      }

      augmentedDescriptors.push(augmentedFace);
    }

    return augmentedDescriptors;
  };

  useEffect(() => {
    if (recognitionModal) {
      loadModels()
        .then(() => startVideo())
        .catch((error) => {
          console.error("Erro durante o carregamento:", error);
        });
    }
  }, [recognitionModal, loadModels, startVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (recognitionModal && video && faceMatcher) {
      video.addEventListener("play", async () => {
        const canvas = canvasRef.current;
        const displaySize = { width: 300, height: 225 };
        faceApi.matchDimensions(canvas!, displaySize);

        const updateFaceRecognition = async () => {
          const detections = await faceApi
            .detectAllFaces(video)
            .withFaceLandmarks()
            .withFaceDescriptors();

          const resizedDetections = faceApi.resizeResults(
            detections,
            displaySize
          );

          canvas
            ?.getContext("2d")
            ?.clearRect(0, 0, canvas.width, canvas.height);

          if (resizedDetections.length > 0) {
            const bestMatch = faceMatcher.findBestMatch(
              resizedDetections[0].descriptor
            );

            const text = bestMatch.label || "Desconhecido";

            new faceApi.draw.DrawTextField(
              [text],
              resizedDetections[0].detection.box.bottomLeft
            ).draw(canvas!);
            
            
            const response = await axios.get('/api/auth/all_users')
            console.log(response.data)
            
            // get user detected
            const user = response.data.find((user: any) => user.name === text)
            
            if(user){
              setUser(user)
              // adicionar ao localstorage
              localStorage.setItem('user', JSON.stringify(user))
              setRecognitionModal(false)
              router.push('/')
            }
            
            // desligar a camera
            video.pause()
          }

          requestAnimationFrame(updateFaceRecognition);
        };

        updateFaceRecognition();
      });
    }
  }, [recognitionModal, faceMatcher]);

  if (!recognitionModal) return null;

  return (
    <div className="fixed flex justify-center items-center h-screen w-screen bg-[#00000050] z-[999999]">
      <div className="bg-white shadow-lg rounded-lg flex justify-center h-fit w-[600px] p-6 relative">
        <CloseIcon
          onClick={() => setRecognitionModal(false)}
          className="absolute top-0 right-0 m-4 cursor-pointer"
        />

        <div className="flex w-[300px] relative flex-col gap-5 items-center justify-center">
          <div className="relative w-[300px] h-[225px] overflow-hidden">
            <video
              id="video"
              width="300px"
              height="225px"
              autoPlay
              muted
              playsInline
              webkit-playsinline="true"
              ref={videoRef}
            />
            <canvas
              id="canvas"
              ref={canvasRef}
              className="absolute top-0 left-0 w-[300px] h-[225px]"
            />
          </div>
          {videoLoading && <span>Carregando...</span>}
        </div>
      </div>
    </div>
  );
}
