"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/contextApi";

export default function Admin () {
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [routeId, setRouteId] = useState<string>("");
  const {user, rotas}=useApp()

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureTime: "",
    departureDate: "",
    ticket: [{}],
  });
  
  const router = useRouter()


  const handleCreateRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)

    try {
      await axios.post(`/api/rotas/create?id=${rotas.length + 1}`, {
        ...formData,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      alert("Rota cadastrada com sucesso");
      router.push("/");
      // Redirecionar ou fazer qualquer outra ação necessária após o cadastro
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteRoute = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios
        .delete(`/api/rotas/delete?id=${routeId}`)
        .then(() => {
          alert("Rota deletada com sucesso");
          router.push("/admin")
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
            {/* <input
              className="border-2 border-gray-300 rounded-md p-2"
              placeholder="Horário de chegada"
              type="text"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleInputChange}
            /> */}
            {/* <input
              className="border-2 border-gray-300 rounded-md p-2"
              placeholder="Preço"
              type="text"
              name="price"
              value={formData.ticket}
              onChange={handleInputChange}
            /> */}
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
        <div>
          <form
            className="w-full flex flex-col justify-center gap-4"
            onSubmit={handleDeleteRoute}
          >
            <input
              value={routeId}
              onChange={(e) => setRouteId(e.target.value)}
              className="border-2 border-gray-300 rounded-md p-2"
              placeholder="Insira o ID da rota"
              type="text"
            />
            <button
              className="text-center text-red-500 hover:text-red-900"
              type="submit"
            >
              Deletar rota
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
