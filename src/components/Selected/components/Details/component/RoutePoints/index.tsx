import LocationIcon from "@/assets/icons/LocationIcon"
import { useApp } from "@/contexts/contextApi"
import React from "react"

const RoutePoints: React.FC = (props) => {
  const { selectedRoute } = useApp()
  return (
    <div className="flex flex-col gap-5" {...props}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <LocationIcon />
          <span>Origem</span>
        </div>
        <span className="ml-[32px] font-bold text-2xl">{selectedRoute?.origin}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <LocationIcon />
          <span>Destino</span>
        </div>
        <span className="ml-[32px] font-bold text-2xl">{selectedRoute?.destination}</span>
      </div>
    </div>
  )
}

export default RoutePoints
