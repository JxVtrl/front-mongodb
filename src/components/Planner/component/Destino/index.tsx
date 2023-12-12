import React from "react"
import { FormValues } from "../.."
import { useApp } from "@/contexts/contextApi"

type Props = {
  value: FormValues
    setValue: React.Dispatch<React.SetStateAction<FormValues>>
    register:any
  errors:any
}
const Destino: React.FC<Props> = ({ setValue, value, errors, register }) => {
  const { rotas } = useApp()
  
  
  // select com rotas
  return (
    <div className="wrapper-input flex flex-col h-[65px] relative">
      <select
        className="input"
        {...register("destino", { required: "Destino é obrigatório" })}
        value={value.destino}
        onChange={(e) => setValue({ ...value, destino: e.target.value })}
      >
        <option value="">Destino</option>
        {rotas.map((rota) => {
          return <option value={rota.destination}>{rota.destination}</option>
        })}
      </select>
      {errors.destino && (
        <span className="error-message-home destiny-error">
          {errors.destino.message}
        </span>
      )}
    </div>
  ) 
}

export default Destino
