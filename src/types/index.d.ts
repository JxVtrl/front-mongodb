export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

export type Assento = {
    id: number,
    numero: number,
    ocupado: boolean,
}

export type Rota = {
    _id: number,
    origin: string,
    // origem_coords: {
    //     lat: number,
    //     lng: number,
    // },
    destination: string,
    // destino_coords: {
    //     lat: number,
    //     lng: number,
    // },
    departureTime: string,
    departureDate: string,
    // data_chegada: string,
    // hora_chegada: string,
    // assentos: Assento[],
    // valor: number,
}