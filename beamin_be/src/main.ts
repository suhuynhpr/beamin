import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger'
import { TransformInterceptor } from './core/interceptor/transform.interceptor'
import { ErrorInterceptor } from './core/interceptor/error.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Bookmarks API')
    .setDescription('API for managing bookmarks')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(
    app,
    config,
  )
  SwaggerModule.setup('api', app, document)
  // Áp dụng TransformInterceptor globally
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ErrorInterceptor(),
  )
  await app.listen(3000)
}
bootstrap()
