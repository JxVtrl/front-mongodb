import { useApp } from "@/contexts/contextApi"
import React from "react"

const SeatsSelecteds: React.FC = () => {
  const { seatsSelected } = useApp()
  return (
    <div>
      <span>Assentos selecionados: {seatsSelected.length}</span>
    </div>
  )
}

export default SeatsSelecteds
