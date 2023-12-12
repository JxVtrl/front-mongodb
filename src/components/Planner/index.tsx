"use client"

import { useApp } from "@/contexts/contextApi"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Origem from "./component/Origem"
import Data from "./component/Data"
import Destino from "./component/Destino"
import Passageiros from "./component/Passageiros"
import Limpar from "./component/Limpar"
import { useRouter } from "next/navigation"

export interface FormValues {
  origem: string
  destino: string
  data: string
  passageiros: number
}

const Planner: React.FC = () => {
  const { rotas } = useApp()
  const [formData, setFormData] = useState<FormValues>({
    origem: "",
    destino: "",
    data: "",
    passageiros: 0,
  })

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormValues>()
  
  const router = useRouter()

  // Função para enviar os dados do formulário
  const onSubmit = (data: FormValues) => {
    const dataReverse = data.data.split("-").reverse().join("/")
    
    const rotaEncontrada = rotas.find(
      (rota) =>
        rota.origin === data.origem &&
        rota.destination === data.destino &&
        rota.departureDate === dataReverse
    )
    
    // Se não existir, mostrar mensagem de erro
    if (!rotaEncontrada) {
      alert("Não foi possível encontrar uma rota com os dados informados")
      return
    } else {
      router.push(`/selecionar?id=${rotaEncontrada._id}`)
    }
      
  }

  // Função para limpar todos os campos
  const limparCampos = () => {
    setFormData({
      origem: "",
      destino: "",
      data: "",
      passageiros: 0,
    })
  }
  return (
    <div className="box-select-wrapper mx-5">
      <form
        className="flex flex-col w-fit bg-white px-[15px] py-[24px] gap-[12px] justify-center rounded-[12px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        
        <div className="flex gap-[12px]">
        <div className="flex flex-col gap-[8px]">
          <Origem
            value={formData}
            setValue={setFormData}
            errors={errors}
            register={register}
          />
          <Data
            value={formData}
            setValue={setFormData}
            errors={errors}
            register={register}
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <Destino
            value={formData}
            setValue={setFormData}
            errors={errors}
            register={register}
          />

              <button type="submit" className="botao-buscar">
                BUSCAR
              </button>
          </div>
        </div>
          
              <Limpar limparCampos={limparCampos} />
      </form>
    </div>
  )
}

export default Planner
