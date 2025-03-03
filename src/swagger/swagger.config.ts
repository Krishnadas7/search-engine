import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerConfig } from './swagger.interface';

export const SWAGGER_CONFIG:SwaggerConfig = {
    title:"NestJs config",
    description:"Template",
    version:"1.0",
    tags:["task"]
}