import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BookModule } from './book-module/book.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure env variables are loaded globally
    DatabaseModule,
    BookModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

console.log('DB_URL from downodule:', process.env.DB_URL);
