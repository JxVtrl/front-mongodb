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
  if (!date) return ""
  console.log(date)
  
  // check if date is in the format of utc "2021-10-10T00:00:00.000Z"
  if (date.includes("T")) {
    const dateSplit = date.split("T")[0].split("-")
    const day = dateSplit[2]
    const month = dateSplit[1]
    const year = dateSplit[0]

    return `${day}/${month}/${year}`
  }
  
  const dateSplit = date.split("/")

  const day = dateSplit[0].toString().padStart(2, "0")
  const month = dateSplit[1].toString().padStart(2, "0")
  const year = dateSplit[2]

  return `${day}/${month}/${year}`
}

export const format_hour = (hour: string) => {
  
  if (!hour) return ""
  
  
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

export const gerarseats = () => {
  let seats = []

  for (let i = 0; i < 48; i++) {
    seats.push({
      id: i,
      numero: i + 1,
      ocupado: random_boolean(),
    })
  }

  return seats
}

export const gerarvalue = (min = 0, max = 1000) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export function travelTime(departureTime: string, arrive_time: string) {
  const [horaIdaHours, horaIdaMinutes] = departureTime.split(":").map(Number)
  const [horaChegadaHours, horaChegadaMinutes] = arrive_time
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

export const validateCpf = (cpf: string) => {
  let firstDigit = 0;
  let secondDigit = 0;

  //   Declarando um array vazio para os cpf's
  let cpf_array = [];

  //   Verificando se o cpf possui pontos e hífen, e caso tenha substituindo-os por nada
  for (let i = 0; i < cpf.length; i++) {
    if (cpf[i] == "." || cpf[i] == "-") {
      cpf = cpf.replace(cpf[i], "");
    }

    // Cálculo do primeiro dígito
    let sum = 0;
    for (let i = 1; i <= 9; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);

    let rest = sum % 11;

    if (rest < 2) {
      firstDigit = 0;
    } else {
      firstDigit = 11 - rest;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);

    rest = sum % 11;

    if (rest < 2) {
      secondDigit = 0;
    } else {
      secondDigit = 11 - rest;
    }
  }

  let cpf_verified = cpf.substring(0, 9) + firstDigit + secondDigit;

  cpf_array.push(cpf);
  cpf_array.push(cpf_verified);

  if (cpf_array[0] !== cpf_array[1]) {
    console.log("CPF inválido")
    return false;
  } 
  console.log("CPF válido")
  return true
};

export const getCoordsInGoogleMaps = async (cidade: string) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${cidade}&key=AIzaSyCTCwVmfCP44WUBBvmeXn7lvO1pJ4k5e2U`
    )

    const data = await response.json()
    const location = data.results[0].geometry.location
    
    return location
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

    let origin_coords = await getCoordsInGoogleMaps(origem)
    do {
      origem = cidades[Math.floor(Math.random() * cidades.length)]
      origin_coords = await getCoordsInGoogleMaps(origem)
    } while (!origin_coords)

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
    let arrive_date = `${random_day}/${random_month}/${random_year}`

    // let rota: Rota = {
    //   _id: i,
    //   origem,
    //   origin_coords,
    //   destino,
    //   destino_coords,
    //   departureDate,
    //   departureTime: `${Math.floor(Math.random() * 24)}:${Math.floor(
    //     Math.random() * 60
    //   )}`,
    //   arrive_date,
    //   arrive_time: `${Math.floor(Math.random() * 24)}:${Math.floor(
    //     Math.random() * 60
    //   )}`,
    //   seats: gerarseats(),
    //   value: gerarvalue(),
    // }
    // rotas.push(rota)
  }

  return rotas
}
