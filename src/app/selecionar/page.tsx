"use client"

import Selected from "@/components/Selected"
import { useApp } from "@/contexts/contextApi"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"

const Page: React.FC = () => {
  const { rotas, setSelectedRoute,setPassengersInfo,setSeatsSelected } = useApp()

  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const router = useRouter()

  React.useEffect(() => {
    if (!id) return

    const route = rotas.find((rota) => rota._id === Number(id))

    if (!route) {
      router.push("/")
      return
    } else {
      setSelectedRoute(route)
      setPassengersInfo([])
      setSeatsSelected([])
    }
  }, [rotas, id, setSelectedRoute, router,setPassengersInfo,setSeatsSelected])

  return <Selected />
}

export default Page
