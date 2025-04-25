import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador-dto';
import { jogador } from './interfaces/jogadores.interface';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<jogador>,
  ) {}

  async criarAtualizarJogador(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<jogador> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      console.log(`jogadorEncontrado: Entrou aqui`);
      return await this.atualizar(criarJogadorDto);
    }

    await this.criar(criarJogadorDto);
  }
  private async criar(criarJogadorDto: CriarJogadorDto): Promise<jogador> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDto);

    return jogadorCriado.save();
  }
  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<jogador> {
    return await this.jogadorModel
      .findOneAndUpdate(
        { email: criarJogadorDto.email },
        { $set: criarJogadorDto },
      )
      .exec();
  }
  async consultarJogadoresPorEmail(email: string): Promise<jogador> {
    const jogador = await this.jogadorModel.findOne({ email }).exec();

    if (!jogador) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado`);
    }
    return jogador;
  }

  async consultarTodosJogadores(): Promise<jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async deletarJogador(email: string): Promise<any> {
    return await this.jogadorModel.deleteOne({ email }).exec();
  }
}
