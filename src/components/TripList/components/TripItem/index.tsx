import ArrowRight from "@/assets/icons/ArrowRight"
import Map from "@/components/Map"
import SelectedMap from "@/components/Selected/components/SelectedMap"
import { Rota } from "@/types"
import { format_date, format_hour } from "@/utils/functions"
import Link from "next/link"
import React from "react"

type TripItemProps = {
  rota: Rota
}

const TripItem: React.FC<TripItemProps> = ({ rota }) => {
  return (
    <Link
      href={{
        pathname: `/selecionar`,
        query: { id: rota._id },
      }}
      key={rota._id}
      className="w-full max-w-[800px] bg-white shadow-md my mx-auto rounded-md cursor-pointer hover:shadow-lg transition duration-200 ease-in-out p-5 gap-3 flex flex-col"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center justify-center text-center gap-2">
            <h3>
              <b>{rota.origin}</b> - {rota.departureTime}
            </h3>
            <ArrowRight />
            <h3>
              <b>{rota.destination}</b> - {Number(rota.departureTime.split(":")[0] )+ 3 + ":" + rota.departureTime.split(":")[1]}
            </h3>
          </div>
          <p>{
            // converter rota.departureDate para o formato americano
            new Date(rota.departureDate).toLocaleDateString("pt-BR", {
              timeZone: "UTC",
            })
            
      
            
          }</p>
        </div>
        {/* <p className="text-xl font-bold text-green-500">R$ {rota.valor}</p> */}
      </div>
      <SelectedMap route={rota} />
    </Link>
  )
}

export default TripItem
