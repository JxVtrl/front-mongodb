import CloseIcon from "@/assets/icons/CloseIcon"
import { useApp } from "@/contexts/contextApi"
import React from "react"

const Header: React.FC = () => {
  const { setSelectSeatModal, setSeatsSelected, setPassengersInfo } = useApp()
  return (
    <div className="w-full h-[72px] flex items-center p-5 justify-between border-b border-gray-200">
      <span className="text-2xl font-bold">Seleção de Assentos</span>
      <button
        onClick={() => {
          setSelectSeatModal(false)
          setSeatsSelected([])
          setPassengersInfo([])
        }}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

export default Header
