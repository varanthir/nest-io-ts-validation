import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { EventController } from './event.controller'

@Module({
  controllers: [AppController, EventController],
})
export class AppModule {}
