import mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    telefoneCelular: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    ranking: { type: String, required: true },
    posicaoRanking: { type: Number, required: true },
    urlFotoJogador: { type: String, required: true },
  },
  { timestamps: true, collection: 'jogadores' },
);
