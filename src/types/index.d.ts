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
    _id: number | string,
    origin: string,
    origin_coords: {
        lat: number,
        lng: number,
    },
    destination: string,
    destination_coords: {
        lat: number,
        lng: number,
    },
    departureTime: string,
    departureDate: string,
    arrive_date?: string,
    arrive_time?: string,
    seats: Assento[],
    value: number,
}