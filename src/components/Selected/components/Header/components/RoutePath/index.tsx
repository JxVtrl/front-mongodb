"use client"
import { useApp } from "@/contexts/contextApi"
import React from "react"

import LocationIcon from "@/assets/icons/LocationIcon"
import ArrowRight from "@/assets/icons/ArrowRight"

const RoutePath: React.FC = () => {
  const { selectedRoute } = useApp()
  
  if(!selectedRoute) return null
  
  return (
    <div className="flex flex-row items-center gap-[8px]">
      <LocationIcon />
      <p className="text-sm text-gray-500">{selectedRoute?.origin}</p>
      <ArrowRight />
      <p className="text-sm text-gray-500">{selectedRoute?.destination}</p>
    </div>
  )
}

export default RoutePath
