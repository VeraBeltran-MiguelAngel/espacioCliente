import { Time } from "@angular/common";

export class User {
  //represnta una tabla usuarios
  id!: number;
  name!: string;
  username!: string;
  password_hash!: string;
  api_key!: string;
}

//Objeto de tipo detalles del componente Home engloba tabla cliente, membresia, gimansio y detalle membresia
export class detalles {
  idMem!: string;
  titulo!: string;
  detalles!: string;
  duracion!: string;
  precio!: string;
  idGimnasio!: string;
  nombreGym!: string;
  telefono!: string;
  calle!: string;
  numExt!: string;
  numInt!: string;
  colonia!: string;
  ciudad!: string;
  estado!: string;
  codigoPostal!: string;
  idDetMem!: string;
  fechaInicio!: string;
  fechaFin!: string;
  estatus!: string;
}

//Objeto de tipo mensaje retornado - indicar el estado de alguna operacion
export class mensaje {
  msg!: string;
}

//lista gimansios
export class dataGym {
  idGimnasio!: number;
  nombreGym!: string;
  codigoPostal!: string;
  estado!: string;
  ciudad!: string;
  colonia!: string;
  calle!: string;
  numExt!: string;
  numInt!: string;
  telefono!: string;
  tipo!: string;
  Franquicia_idFranquicia!: string;
  casilleros!: string;
  estacionamiento!: string;
  regaderas!: string;
  bicicletero!: string;
}

//Lista horarios 
export class dataHoraios {
  idHorarios!: number;
  diaSemana!: string;
  horaEntrada!: Time;
  horaSalida!: Time;
  Gimnasio_idGimnasio!: number;
}

//Historial de compras
export class historial {
  idDetMem!: string;
  nombreGym!: string;
  titulo!: string;
  precio!: number;
  fechaInicio!: Date;
  fechaFin!: Date;
}

//Datos membresia - tabla
export class dataMembresia {
  idMem!: number;
  titulo!: string;
  detalles!: string;
  duracion!: string;
  ofertas!: string;
  entrenador!: string;
  precio!: number;
  canchaAcc!: string;
  albercaAcc!: string;
  gymAcc!: string;
  Gimnasio_idGimnasio!: string;
}