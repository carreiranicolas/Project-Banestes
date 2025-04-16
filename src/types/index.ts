
// Define the interfaces for the data structures as specified in the requirements

export interface Cliente {
  id: string;
  cpfCnpj: string;
  rg?: string;
  dataNascimento: Date;
  nome: string;
  nomeSocial?: string;
  email: string;
  endereco: string;
  rendaAnual: number;
  patrimonio: number;
  estadoCivil: "Solteiro" | "Casado" | "Viúvo" | "Divorciado";
  codigoAgencia: number;
}

export interface Conta {
  id: string;
  cpfCnpjCliente: string;
  tipo: "corrente" | "poupanca";
  saldo: number;
  limiteCredito: number;
  creditoDisponivel: number;
}

export interface Agencia {
  id: string;
  codigo: number;
  nome: string;
  endereco: string;
}

// Helper interface for parsed CSV data
export interface ClienteRaw extends Omit<Cliente, 'dataNascimento' | 'rendaAnual' | 'patrimonio' | 'codigoAgencia'> {
  dataNascimento: string;
  rendaAnual: string;
  patrimonio: string;
  codigoAgencia: string;
}

export interface ContaRaw extends Omit<Conta, 'saldo' | 'limiteCredito' | 'creditoDisponivel'> {
  saldo: string;
  limiteCredito: string;
  creditoDisponivel: string;
}

export interface AgenciaRaw extends Omit<Agencia, 'codigo'> {
  codigo: string;
}
