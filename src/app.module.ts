import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:PB3bLx1DxQ1wURpA@cluster0.zlsuqki.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
