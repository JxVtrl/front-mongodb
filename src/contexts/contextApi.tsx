"use client";

import {
  criar_rotas,
  orderByYearThenByMonthThenByDayThenHour,
} from "../utils/functions";
import { Assento, Rota } from "../types";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  cpf?: string;
};

interface ContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  rotas: Rota[];
  setRotas: React.Dispatch<React.SetStateAction<Rota[]>>;
  selectedRoute: Rota | null;
  setSelectedRoute: React.Dispatch<React.SetStateAction<Rota | null>>;
  selectSeatModal: boolean;
  setSelectSeatModal: React.Dispatch<React.SetStateAction<boolean>>;
  seatsSelected: Assento[];
  setSeatsSelected: React.Dispatch<React.SetStateAction<Assento[]>>;
  passengersInfo: {
    passenger: {
      name: string;
      cpf: string;
    };
    seat: {
      numero: number;
    };
  }[];
  setPassengersInfo: React.Dispatch<
    React.SetStateAction<
      {
        passenger: {
          name: string;
          cpf: string;
        };
        seat: {
          numero: number;
        };
      }[]
    >
  >;
  checkoutStep: number;
  setCheckoutStep: React.Dispatch<React.SetStateAction<number>>;
  paymentType: "credit_card" | "pix" | "boleto";
  setPaymentType: React.Dispatch<
    React.SetStateAction<"credit_card" | "pix" | "boleto">
  >
  modalAgradecimento: boolean
  setModalAgradecimento: React.Dispatch<React.SetStateAction<boolean>>
  compraRealizada: boolean
  setCompraRealizada: React.Dispatch<React.SetStateAction<boolean>>
  recognitionModal: boolean;
  setRecognitionModal: React.Dispatch<React.SetStateAction<boolean>>;
  userProfileImage: string;
  setUserProfileImage: React.Dispatch<React.SetStateAction<string>>;
  photoModal: boolean;
  setPhotoModal: React.Dispatch<React.SetStateAction<boolean>>;
  photoModalUrl: string;
  setPhotoModalUrl: React.Dispatch<React.SetStateAction<string>>;
  validCpf: boolean;
  setValidCpf: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<ContextProps>({} as ContextProps);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [rotas, setRotas] = useState<Rota[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Rota | null>(null);
  const [selectSeatModal, setSelectSeatModal] = useState(false);
  const [seatsSelected, setSeatsSelected] = useState<Assento[]>([]);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [photoModal, setPhotoModal] = useState(false);
  const [photoModalUrl, setPhotoModalUrl] = useState<string>("");
  const [validCpf, setValidCpf] = useState(false);

  const [paymentType, setPaymentType] = useState<
    "credit_card" | "pix" | "boleto"
  >("pix");
  const [recognitionModal, setRecognitionModal] = useState(false);
  const [passengersInfo, setPassengersInfo] = useState<
    {
      passenger: {
        name: string;
        cpf: string;
      };
      seat: {
        numero: number;
      };
    }[]
  >([]);
  const [modalAgradecimento, setModalAgradecimento] = useState(false);
  const [compraRealizada, setCompraRealizada] = useState(false);

  const [userProfileImage, setUserProfileImage] = useState<string>('');

  // const fetchRotas = async () => {
  //   const rotas_local = localStorage.getItem("rotas");

  //   let used_routes = JSON.parse(rotas_local || "[]");

  //   if (!rotas_local) used_routes = await criar_rotas();
  //   localStorage.setItem("rotas", JSON.stringify(used_routes));

  //   used_routes.sort(orderByYearThenByMonthThenByDayThenHour);

  //   setRotas(used_routes);
  // };

  const getRotas = async () => {
    const url = `/api/rotas/all`;

    const res = await axios.get(url);
    console.log("Rotas disponiveis: " + res.data);
    setRotas(res.data);
  };

  useEffect(() => {
    getRotas()
    // fetchRotas();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!!user && user !== "undefined") {
      setUser(user.length > 0 ? JSON.parse(user) : null);
    }
  }, []);

  const value = {
    user,
    setUser,
    rotas,
    setRotas,
    selectedRoute,
    setSelectedRoute,
    selectSeatModal,
    setSelectSeatModal,
    seatsSelected,
    setSeatsSelected,
    passengersInfo,
    setPassengersInfo,
    checkoutStep, setCheckoutStep,
    paymentType, setPaymentType,
    modalAgradecimento, setModalAgradecimento,
    compraRealizada, setCompraRealizada,
    userProfileImage,
    setUserProfileImage,
      recognitionModal,
    setRecognitionModal,
    photoModal,
    setPhotoModal,
    photoModalUrl,
    setPhotoModalUrl,
    validCpf,
    setValidCpf
    
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
