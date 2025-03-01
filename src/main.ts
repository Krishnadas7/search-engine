import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log('DB_URL from AppModule:', process.env.DB_URL); // Check if it's loaded
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
