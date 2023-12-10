"use client"

import {
  criar_rotas,
  orderByYearThenByMonthThenByDayThenHour,
} from "../utils/functions"
import { Assento, Rota } from "../types"
import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

type User = {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: string
  cpf?: string
}

interface ContextProps {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  rotas: Rota[]
  selectedRoute: Rota | null
  setSelectedRoute: React.Dispatch<React.SetStateAction<Rota | null>>
  selectSeatModal: boolean
  setSelectSeatModal: React.Dispatch<React.SetStateAction<boolean>>
  seatsSelected: Assento[]
  setSeatsSelected: React.Dispatch<React.SetStateAction<Assento[]>>
  passengersInfo: {
    passenger: {
      name: string
      cpf: string
    }
    seat: {
      numero: number
    }
  }[]
  setPassengersInfo: React.Dispatch<
    React.SetStateAction<
      {
        passenger: {
          name: string
          cpf: string
        }
        seat: {
          numero: number
        }
      }[]
    >
  >
  checkoutStep: number
  setCheckoutStep: React.Dispatch<React.SetStateAction<number>>
}

const AppContext = createContext<ContextProps>({} as ContextProps)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [rotas, setRotas] = useState<Rota[]>([])
  const [selectedRoute, setSelectedRoute] = useState<Rota | null>(null)
  const [selectSeatModal, setSelectSeatModal] = useState(false)
  const [seatsSelected, setSeatsSelected] = useState<Assento[]>([])
  const[checkoutStep, setCheckoutStep] = useState(0)
  const [passengersInfo, setPassengersInfo] = useState<{
      passenger: {
        name: string
        cpf: string
      }
      seat: {
        numero: number
      }
    }[]
  >([])

  const fetchRotas = async () => {
    const rotas_local = localStorage.getItem("rotas")

    let used_routes = JSON.parse(rotas_local || "[]")

    if (!rotas_local) used_routes = await criar_rotas()
    localStorage.setItem("rotas", JSON.stringify(used_routes))

    used_routes.sort(orderByYearThenByMonthThenByDayThenHour)

    // used_routes = used_routes.filter((rota: Rota) => {
    //   const now = new Date()
    //   const rota_ida = rota.data_ida.split("/").reverse().join("/")
    //   const rota_date = new Date(rota_ida)
    //   return rota_date.getTime() > now.getTime()
    // })

    setRotas(used_routes)
  }

  const getRotas = async () => {
    const url = `/api/rotas/all`

    const res = await axios.get(url)
    console.log("Rotas disponiveis: " + res.data)
    setRotas(res.data)
  }

  useEffect(() => {
    // getRotas()
    fetchRotas()
  }, [])

  useEffect(() => {
    const user = localStorage.getItem("user")

    if (!!user && user !== "undefined") {
      setUser(user.length > 0 ? JSON.parse(user) : null)
    }
  }, [])

  const value = {
    user,
    setUser,
    rotas,
    selectedRoute,
    setSelectedRoute,
    selectSeatModal,
    setSelectSeatModal,
    seatsSelected,
    setSeatsSelected,
    passengersInfo,
    setPassengersInfo,
    checkoutStep,setCheckoutStep
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
