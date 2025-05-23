import { Document } from 'mongoose';

export interface jogador extends Document {
  readonly _id: string;
  readonly telefoneCelular: string;
  readonly email: string;
  nome: string;
  ranking: string;
  posicaoRanking: number;
  urlFotoJogador: string;
}