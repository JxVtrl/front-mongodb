import React from "react"
import { FormValues } from "../.."
import { useApp } from "@/contexts/contextApi"
type Props = {
  value: FormValues
  setValue: React.Dispatch<React.SetStateAction<FormValues>>
  errors: any
  register: any
}
const Origem: React.FC<Props> = ({ setValue, value, errors, register }) => {
  
  const { rotas } = useApp()
  
  return (
    <div className="wrapper-input flex flex-col h-[65px] relative">
      <select
        className="input"
        {...register("origem", { required: "Origem é obrigatória" })}
        value={value.origem}
        onChange={(e) => setValue({ ...value, origem: e.target.value })}
      >
        <option value="">Origem</option>
        {rotas.map((rota,index) => {
          return <option key={index} value={rota.origin}>{rota.origin}</option>
        })}
      </select>
      {errors.origem && (
        <span className="error-message-home origin-error">
          {errors.origem.message}
        </span>
      )}
    </div>
  )
}

export default Origem
