import React from "react"
import { useApp } from "@/contexts/contextApi"
import BusSeatIcon from "@/assets/icons/BusSeatIcon"
import '../../../../../../styles/busSeat.css'

const BusSeats: React.FC = () => {
  const { selectedRoute, setSeatsSelected, seatsSelected } = useApp()

  if (!selectedRoute) return null

  const { assentos } = selectedRoute

  return (
    <div className="w-full h-[300px] flex flex-col justify-center items-center rounded-xl relative bg-gray-100 shadow-md overflow-hidden">
      <div className="absolute grid grid-flow-col grid-rows-4 gap-2 w-[80%] h-[75%] bus-seats-icons">
        {assentos.map((seat) => (
          <div
            key={seat.id}
            className={`w-full h-full rounded-full flex items-center justify-center relative hover:scale-110 transition-all  duration-200 ${
              seat.ocupado ? "cursor-not-allowed" : "cursor-pointer"
            } flex-col`}
            onClick={() => {
              if (seat.ocupado) return
              if (seatsSelected.find((s) => s.id === seat.id)) {
                setSeatsSelected(seatsSelected.filter((s) => s.id !== seat.id))
              } else {
                setSeatsSelected([...seatsSelected, seat])
              }
            }}
          >
            <BusSeatIcon
              isAvailable={!seat.ocupado}
              style={{
                color: seatsSelected.find((s) => s.id === seat.id)
                  ? "green"
                  : seat.ocupado
                  ? "#ccc"
                  : "#000",
              }}
            />
            <span className="text-xs">{seat.numero}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BusSeats
