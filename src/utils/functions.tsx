import { cidades } from "../data/cidades"
import { Rota } from "../types"
import { faker } from "@faker-js/faker"

export const createParamsInUrl = (params: any) => {
  let url = ""

  Object.keys(params).forEach((key, index) => {
    if (index === 0) {
      url += `?${key}=${params[key]}`
    } else {
      url += `&${key}=${params[key]}`
    }
  })

  return url
}

export const random_date = (start: Date, end: Date) => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const format_date = (date: string) => {
  
  if(!date) return ""
  
  const dateSplit = date.split("/")

  const day = dateSplit[0].toString().padStart(2, "0")
  const month = dateSplit[1].toString().padStart(2, "0")
  const year = dateSplit[2]

  return `${day}/${month}/${year}`
}

export const format_hour = (hour: string) => {
  
  if (!hour) return ""
  
  console.log(hour)
  
  const hourSplit = hour.split(":")

  const hourNew = hourSplit[0].toString().padStart(2, "0")
  const minute = hourSplit[1].toString().padStart(2, "0")

  return `${hourNew}:${minute}`
}

export const orderByYearThenByMonthThenByDayThenHour = (a: Rota, b: Rota) => {
  const departureDate_a = a.departureDate.split(a.departureDate.includes(",") ? "," : "/")
  const departureDate_b = b.departureDate.split(b.departureDate.includes(",") ? "," : "/")

  const departureTime_a = a.departureTime.split(":")[0].padStart(2, "0")
  const departureTime_b = b.departureTime.split(":")[0].padStart(2, "0")

  const minuto_ida_a = a.departureTime.split(":")[1].padStart(2, "0")
  const minuto_ida_b = b.departureTime.split(":")[1].padStart(2, "0")

  const dia_a = Number(departureDate_a[0].padStart(2, "0"))
  const dia_b = Number(departureDate_b[0].padStart(2, "0"))

  const mes_a = Number(departureDate_a[1].padStart(2, "0"))
  const mes_b = Number(departureDate_b[1].padStart(2, "0"))

  const ano_a = Number(departureDate_a[2])
  const ano_b = Number(departureDate_b[2])

  const data_a = new Date(
    `${ano_a}-${mes_a}-${dia_a}T${departureTime_a}:${minuto_ida_a}`
  )
  const data_b = new Date(
    `${ano_b}-${mes_b}-${dia_b}T${departureTime_b}:${minuto_ida_b}`
  )

  return data_a.getTime() - data_b.getTime()
}

export const random_boolean = () => {
  return Math.random() < 0.5
}

export const generate_user = () => {
  const user = {
    id: faker.string.uuid(),
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    telefone: faker.phone.number(),
    data_nascimento: random_date(new Date(1980, 0, 1), new Date(2000, 0, 1)),
    senha: faker.internet.password(),
  }

  return user
}

export const gerarAssentos = () => {
  let assentos = []

  for (let i = 0; i < 48; i++) {
    assentos.push({
      id: i,
      numero: i + 1,
      ocupado: random_boolean(),
    })
  }

  return assentos
}

export const gerarValor = (min = 0, max = 1000) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export function travelTime(departureTime: string, hora_chegada: string) {
  const [horaIdaHours, horaIdaMinutes] = departureTime.split(":").map(Number)
  const [horaChegadaHours, horaChegadaMinutes] = hora_chegada
    .split(":")
    .map(Number)

  let diffHours = horaChegadaHours - horaIdaHours
  let diffMinutes = horaChegadaMinutes - horaIdaMinutes

  // Se a hora de ida for maior que a hora de chegada, adiciona 24 horas para corrigir a diferença
  if (diffHours < 0) {
    diffHours += 24
  }

  // Se os minutos de ida forem maiores que os minutos de chegada, subtrai 1 hora e adiciona 60 minutos para corrigir a diferença
  if (diffMinutes < 0) {
    diffHours -= 1
    diffMinutes += 60
  }

  const totalDiff = diffHours + diffMinutes / 60

  return `${totalDiff.toFixed(0)}h ${diffMinutes.toFixed(0)}min`
}

export const getCoordsInGoogleMaps = async (cidade: string) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${cidade}&key=AIzaSyCTCwVmfCP44WUBBvmeXn7lvO1pJ4k5e2U`
    )

    const data = await response.json()
    return data.results[0].geometry.location
  } catch (error) {
    return false
  }
}

export const criar_rotas = async () => {
  let rotas: Rota[] = []

  for (let i = 0; i < 4; i++) {
    let origem = cidades[Math.floor(Math.random() * cidades.length)]
    let destino = cidades.filter((cidade) => cidade !== origem)[
      Math.floor(Math.random() * cidades.length)
    ]

    let origem_coords = await getCoordsInGoogleMaps(origem)
    do {
      origem = cidades[Math.floor(Math.random() * cidades.length)]
      origem_coords = await getCoordsInGoogleMaps(origem)
    } while (!origem_coords)

    let destino_coords = await getCoordsInGoogleMaps(destino)
    do {
      destino = cidades.filter((cidade) => cidade !== origem)[
        Math.floor(Math.random() * cidades.length)
      ]
      destino_coords = await getCoordsInGoogleMaps(destino)
    } while (!destino_coords)

    let random_day = (Math.floor(Math.random() * 30) + 1)
      .toString()
      .padStart(2, "0")
    let random_month = (Math.floor(Math.random() * 12) + 1)
      .toString()
      .padStart(2, "0")
    let random_year = Math.floor(Math.random() * 2) + 2024

    let departureDate = `${random_day}/${random_month}/${random_year}`
    let data_chegada = `${random_day}/${random_month}/${random_year}`

    let rota: Rota = {
      _id: i,
      origem,
      origem_coords,
      destino,
      destino_coords,
      departureDate,
      departureTime: `${Math.floor(Math.random() * 24)}:${Math.floor(
        Math.random() * 60
      )}`,
      data_chegada,
      hora_chegada: `${Math.floor(Math.random() * 24)}:${Math.floor(
        Math.random() * 60
      )}`,
      assentos: gerarAssentos(),
      valor: gerarValor(),
    }
    rotas.push(rota)
  }

  return rotas
}
