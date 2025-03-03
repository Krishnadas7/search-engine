import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix("api/v1")
  SwaggerModule.setup("api",app,createDocument(app))
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
