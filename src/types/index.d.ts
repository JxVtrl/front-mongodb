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
    origem_coords: {
        lat: number,
        lng: number,
    },
    destination: string,
    destination_coords: {
        lat: number,
        lng: number,
    },
    departure_time: string,
    arrive_time: string,
    departure_date: string,
    arrive_date: string,
    seats: Assento[],
    valor: number,
}