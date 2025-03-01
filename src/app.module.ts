import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

console.log('DB_URL from AppModule:', process.env.DB_URL);

@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure env variables are loaded globally
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

console.log('DB_URL from downodule:', process.env.DB_URL);
