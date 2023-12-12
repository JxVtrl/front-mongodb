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
    id: number,
    origem: string,
    origem_coords: {
        lat: number,
        lng: number,
    },
    destino: string,
    destino_coords: {
        lat: number,
        lng: number,
    },
    hora_ida: string,
    data_ida: string,
    data_chegada: string,
    hora_chegada: string,
    assentos: Assento[],
    valor: number,
}