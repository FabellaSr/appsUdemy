export type Role = 'ADMIN' | 'MEMBER';

export interface User {
  id: string;
  username: string;
  role: Role;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export interface Installation {
  type: string;
  number: string;
  sequence: string;
  description: string;
  user: string;
  status: string;
  date: string;
}

export interface InstallationDetailItem {
  objeto: string;
  libAuxiliar: string;
  qsrcpf: string;
  tipo: string;
  destinoObjeto: string;
  atributo: string;
  libFuente: string;
  srcFuenteo: string;
  estadoFuente: string;
  estadoObjeto: string;
  fecInstFuente?: string;
  usuarioQueInstaloFuente?: string;
  fecInstObjeto?: string;
  usuarioQueInstaloObjeto?: string;
}
