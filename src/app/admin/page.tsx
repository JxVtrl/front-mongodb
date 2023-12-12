"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/contextApi";

export default function Admin () {
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [routeId, setRouteId] = useState<string>("");
  const {user, rotas, setRotas}=useApp()

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureTime: "",
    departureDate: "",
  });
  
  const router = useRouter()
  console.log(rotas)

  const handleCreateRoute = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
    console.log(formData)
      
      const response = await axios.post("/api/rotas/create", {
        formData
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status == 201) {
      alert("Rota cadastrada com sucesso")
      router.push("/");
      }
      
      if (response.status == 409) {
        alert("Rota já cadastrada")
      }
      
    } catch (err) {
      console.log(err);
      alert("Erro ao cadastrar rota")
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteRoute = async (e: React.FormEvent, id: number) => {
    e.preventDefault();

    try {
      await axios
        .delete(`/api/rotas/delete?id=${id}`)
        .then(() => {
          alert("Rota deletada com sucesso");
          router.push("/admin")
        }).finally(() => {
          const newRotas = rotas.filter((rota) => rota._id !== id);
          setRotas( newRotas);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const adminOptions = [
    {
      name: "Cadastrar nova rota",
    },
    {
      name: "Apagar rota existente",
    },
    {
      name: "Atualizar rota existente",
    },
  ];

  useEffect(() => {
    const verifyUserType = async () => {
      if(!user) return
      if (user.role !== "admin") {
        router.push("/");
      }
    };
    verifyUserType();
  }, [user,router]);

  return (
    <div className="w-screen flex gap-4 flex-col items-center  p-5 justify-center ">
      <h1 className="font-bold text-2xl">Página de Admin</h1>

      <div className="flex flex-col gap-4">
        {adminOptions.map((option,index) => (
          <button
            key={index}
            value={selectedButton}
            onClick={() => {
              setSelectedButton(option.name);
            }}
            className="bg-[#213a5c] hover:bg-[#213a5c]/90 text-white font-bold py-2 px-4 rounded"
          >
            {option.name}
          </button>
        ))}

        <a
          className="font-bold text-center hover:underline py-2 px-4 rounded"
          href="/"
        >
          Voltar
        </a>
      </div>

      {selectedButton === "Cadastrar nova rota" && (
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl">Cadastrar nova rota</h1>
          <form className="flex flex-col gap-4" onSubmit={handleCreateRoute}>
          <input
              className="border-2 border-gray-300 rounded-md p-2"
              placeholder="Origem"
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleInputChange}
            />
            <input
              className="border-2 border-gray-300 rounded-md p-2"
              placeholder="Destino"
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
            />
            <input
              className="border-2 border-gray-300 rounded-md p-2"
              placeholder="Horário de partida"
              type="text"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleInputChange}
            />
          
            <input
              className="border-2 border-gray-300 rounded-md p-2"
              placeholder="Data"
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="bg-[#213a5c] hover:bg-[#213a5c]/90 text-white font-bold py-2 px-4 rounded"
            >
              Cadastrar Rota
            </button>
          </form>
        </div>
      )}
      {selectedButton === "Apagar rota existente" && (
        <>
          {rotas && rotas.map((route) => (
            <div className="flex justify-between w-full bg-blue-800/10 py-2 px-3 rounded-md items-center" key={route._id}>
              <p>{route.origin} - {route.destination}</p>
              <svg
                onClick={(e) => {
                  handleDeleteRoute(e, route._id)
                console.log(route._id)}}
                className="cursor-pointer"
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="1em"
                width="1em"
    >
      <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" />
    </svg>
            </div>
))}
          </>
      )}
    </div>
  );
};
