import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador-dto';
import { jogador } from './interfaces/jogadores.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: jogador[] = [];

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email, telefoneCelular, nome } = criarJogadorDto;

    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (jogadorEncontrado) {
      console.log(`jogadorEncontrado: Entrou aqui`);
      return await this.atualizar(jogadorEncontrado, criarJogadorDto);
    }

    await this.criar(criarJogadorDto);
  }
  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { email, telefoneCelular, nome } = criarJogadorDto;

    const jogador: jogador = {
      _id: uuid(),
      email,
      telefoneCelular,
      nome,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto.jpg',
    };

    this.jogadores.push(jogador);

    console.log(`criarJogadorDto: ${JSON.stringify(jogador)}`);
  }
  private atualizar(
    jogadorEncontrado: jogador,
    criarJogadorDto: CriarJogadorDto,
  ): void {
    const { nome } = criarJogadorDto;

    jogadorEncontrado.nome = nome;
  }
  async consultarJogadoresPorEmail(email: string): Promise<jogador> {
    const jogador =  this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (!jogador) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado`);
    }
    return jogador;
  }

  async consultarTodosJogadores(): Promise<jogador[]> {
    return this.jogadores;
  }

  async deletarJogador(email: string): Promise<void> {
    const jogador =  this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (!jogador) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado`);
    }

    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== email,
    );
  }
}
