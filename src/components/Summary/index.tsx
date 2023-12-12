"use client";
import LocationIcon from "@/assets/icons/LocationIcon";
import PersonIcon from "@/assets/icons/PersonIcon";
import { useApp } from "@/contexts/contextApi";
import { format_hour } from "@/utils/functions";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Summary: React.FC = () => {
  const {
    passengersInfo,
    selectedRoute,
    checkoutStep,
    setCheckoutStep,
    user,
    setModalAgradecimento,
    setCompraRealizada,
    compraRealizada,
    validCpf,
  } = useApp();

  console.log('user', user)

  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const checkIfPassengersInfoIsFilled = () => {
    const isFilled = passengersInfo.every((passengerInfo) => {
      return (
        passengerInfo.passenger.name !== "" &&
        passengerInfo.passenger.cpf !== ""
      );
    });

    return isFilled;
  };

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/ticket/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          quantidadeDePassageiros: passengersInfo.length,
          rota: selectedRoute,
          precoTotal: selectedRoute?.value || 100 * passengersInfo.length,
          passageiros: passengersInfo.map((passengerInfo) => {
            return {
              nome: passengerInfo.passenger.name,
              cpf: passengerInfo.passenger.cpf,
              seat: passengerInfo.seat,
            };
          }),
        }),
      });
      const status = response.status;

      setCompraRealizada(status === 200);
      if (status !== 200) throw new Error('Erro ao realizar compra')
      
      // await axios.post("/api/send-email", {
      //   email: user?.email,
      // }, {
      //   headers: {
      //     "Content-Type": "application/json",

      //   },
      //   method: "POST"

      // }).then(() => {
      //   alert("Email enviado com sucesso!")
      // }).catch(() => {
      //   alert("Erro ao enviar email")
      // })


      setTimeout(() => {
        router.push('/')
      }, 1500);

      setTimeout(() => {
        setModalAgradecimento(true);
      }, 2500);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedRoute) return null;

  return (
    <div className="flex flex-col gap-4 w-full overflow-y-auto h-[600px] bg-gray-100 rounded-xl p-5 shadow-md">
      <div className="flex w-full justify-between items-center border-b-2 border-gray-200 pb-2">
        <span className="text-2xl font-bold">Resumo da compra</span>
      </div>

      <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-md">
        <div className="flex w-full justify-between items-center border-b-2 border-gray-200 pb-2">
          <span>
            Passagem de <b>IDA</b>
          </span>
          <div>
            <span>{selectedRoute?.departureDate}</span>
          </div>
        </div>

        <div className="flex flex-col gap-10 w-full justify-between items-center border-b-2 border-gray-200 py-5">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <LocationIcon />
                <span className="text-md">Origem</span>
              </div>
              <span className="text-lg font-bold ml-8">
                {selectedRoute?.origin}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-md">Saída</span>
              <span className="text-lg font-bold">
                {format_hour(selectedRoute?.departureTime)}
              </span>
            </div>
          </div>

          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <LocationIcon />
                <span className="text-md">Destino</span>
              </div>
              <span className="text-lg font-bold ml-8">
                {selectedRoute?.destination}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-md">Chegada</span>
              <span className="text-lg font-bold">
                {format_hour(selectedRoute.arrive_time || "00:00")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <PersonIcon />
          <span className="text-md font-bold">
            {passengersInfo.length}{" "}
            {passengersInfo.length > 1 ? "passageiros" : "passageiro"}
          </span>
          {checkoutStep === 1 && (
            <span
              className="text-blue-500 cursor-pointer
              text-xs
              hover:text-blue-600 transition duration-200 ease-in-out
              
              "
              onClick={() => setCheckoutStep(0)}
            >
              Editar <b>passageiros</b>
            </span>
          )}
        </div>
      </div>
      <button
        className={`${
          !checkIfPassengersInfoIsFilled()
            ? "opacity-50 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        } rounded-xl p-2 shadow-md`}
        disabled={!checkIfPassengersInfoIsFilled() || loading || !validCpf}
        onClick={() => {
          if (checkoutStep === 0) setCheckoutStep(checkoutStep + 1);
          else {
            handleCheckout();
          }
        }}
      >
        {loading
          ? "Carregando..."
          : checkoutStep === 0
          ? !checkIfPassengersInfoIsFilled()
            ? "Preencha os dados"
            : "Continuar"
          : compraRealizada ? 'Obrigado!' :"Finalizar compra"}
      </button>
    </div>
  );
};

export default Summary;
