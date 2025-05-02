export interface Cadastro {
  id?: string;
  email:  string;
  password: string;
  cpf: bigint;
  name: string;
  birthdate: Date;
  gender: string;
  cep: bigint;
  address: string;
}
