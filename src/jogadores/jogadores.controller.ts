import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador-dto';
import { JogadoresService } from './jogadores.service';
import { jogador } from './interfaces/jogadores.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}
  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(@Query('email') email: string) : Promise<jogador[] | jogador > {
    if (email) {
      const jogador = await this.jogadoresService.consultarJogadoresPorEmail(email);
      return [jogador];
    }
    return await this.jogadoresService.consultarTodosJogadores();
  }
 
  @Delete()
  async deletarJogador(@Query('email') email: string) : Promise<void> {
    await this.jogadoresService.deletarJogador(email);
  }
}
