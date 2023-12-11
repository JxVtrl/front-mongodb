import RoutePath from "@/components/Selected/components/Header/components/RoutePath"
import React, { useEffect } from "react"
import SeatsSelecteds from "./components/SeatsSelecteds"
import BusSeats from "./components/BusSeats"
import Legenda from "./components/Legenda"
import { useApp } from "@/contexts/contextApi"
import { useRouter } from "next/navigation"
import '../../../../styles/busSeat.css'

const Content: React.FC = () => {
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const { setSelectSeatModal, seatsSelected } = useApp()
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  useEffect(() => {
    const disable = seatsSelected.length === 0 || seatsSelected.length > 6
    setButtonDisabled(disable)
  }, [seatsSelected])

  return (
    <div className="p-5 flex flex-col h-full overflow-y-auto bg-white rounded-b-xl gap-4">
      <div className="flex flex-row justify-between items-center bus-seats-main-information">
        <RoutePath />
        <SeatsSelecteds />
      </div>
      <div className="w-full flex-col-reverse flex items-center gap-8">
        <BusSeats />
        <div className="flex flex-row gap-4 w-[75%] justify-between items-center bus-seats-main-information-save">
          <Legenda />
          <button
            disabled={buttonDisabled}
            className={`text-white rounded-xl p-2 transition-all duration-200 w-[320px] h-[40px]
              ${
                buttonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 cursor-pointer hover:bg-green-600"
              }`}
            onClick={() => {
              setLoading(true)

              setTimeout(() => {
                router.push("/checkout")
                setSelectSeatModal(false)
                setLoading(false)
              }, 2000)
            }}
          >
            {loading
              ? "Salvando dados..."
              : seatsSelected.length > 6
              ? "Limite de assentos excedido"
              : "Salvar dados e ir para pagamento"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Content
