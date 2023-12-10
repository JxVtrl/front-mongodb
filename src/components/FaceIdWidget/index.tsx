"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import * as faceApi from "face-api.js";
import { useApp } from "@/contexts/contextApi";
import * as cloudinary from "cloudinary-core";

export default function FaceIdWidget() {
  const { recognitionModal } = useApp();
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("getUserMedia() não é suportado pelo seu navegador!");
  }

  const videoRef = useRef<HTMLVideoElement>(
    document.getElementById("video") as HTMLVideoElement
  );
  const canvasRef = useRef<HTMLCanvasElement>(
    document.getElementById("canvas") as HTMLCanvasElement
  );
  const [faceMatcher, setFaceMatcher] = useState<faceApi.FaceMatcher | null>(
    null
  );

  // Carregar modelos de detecção facial
  const loadModels = useCallback(async () => {
    const MODEL_URL = "/models";
    await faceApi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  }, []);

  // Inicializar a webcam
  const startVideo = useCallback(async () => {
    if (videoRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    }
  }, []);

  const transformDescriptors = useCallback(async (descriptors: any) => {
    const float32Array = [];
    for (let descriptor of descriptors) {
      const result = await descriptor;
      if (result) {
        float32Array.push(new Float32Array(result.descriptor));
      }
    }
    return float32Array;
  }, []);

  const createFaceMatcher = useCallback(async () => {
    const facesMock = [
      {
        name: "João",
        descriptors: [
          "https://res.cloudinary.com/dppimfdxy/image/upload/v1702249589/teste/face_01/d6cotq9soibu0mo1xpeg.jpg",
          "https://res.cloudinary.com/dppimfdxy/image/upload/v1702249590/teste/face_01/ciyzoasqglmcrx7vvdkx.jpg",
          "https://res.cloudinary.com/dppimfdxy/image/upload/v1702249589/teste/face_01/igfguokymw8gu2h9kjxu.jpg",
        ],
      },
    ];

    const labeledFaceDescriptors = facesMock.map(async (face) => {
      const descriptors = face.descriptors.map((url) => {
        const cloudinaryCore = new cloudinary.Cloudinary({
          cloud_name: "dppimfdxy",
          api_key: "893146136213397",
          api_secret: "vHvFad6vFvYL2fSzZXtl38ahSMQ",
          secure: true,
        });
        const response = cloudinaryCore.url(url, {
          resource_type: "image",
        })
        console.log(response);

        const img = document.createElement("img");
        img.crossOrigin = "anonymous";
        img.src = response;

        return faceApi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
      });

      const float32Array = await transformDescriptors(descriptors);

      return new faceApi.LabeledFaceDescriptors(face.name, float32Array);
    });

    Promise.all(labeledFaceDescriptors).then((labeledFaceDescriptors) => {
      if (labeledFaceDescriptors.length > 0) {
        const faceMatcher = new faceApi.FaceMatcher(
          labeledFaceDescriptors,
          0.6
        );
        setFaceMatcher(faceMatcher);
      }
    });
  }, [transformDescriptors]);

  useEffect(() => {
    console.log(faceMatcher);
  }, [faceMatcher]);

  useEffect(() => {
    loadModels().then(() => {
      createFaceMatcher();
      startVideo();
    });
  }, [loadModels, createFaceMatcher, startVideo]);

  if (!recognitionModal) return null;

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#00000050]">
      <div className="bg-white shadow-lg rounded-lg flex justify-center h-[600px] w-[600px] p-6">
        <div className="flex w-[300px] h-[300px] relative rounded-[50%]">
          <video
            id="video"
            width="100%"
            height="100%"
            autoPlay
            muted
            ref={videoRef}
          />
          <canvas id="canvas" ref={canvasRef} className="absolute inset-0" />
        </div>
      </div>
    </div>
  );
}
