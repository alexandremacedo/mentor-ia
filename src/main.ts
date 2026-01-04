import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { QuotaExceededHttpFilter } from './infrastructure/web/filters/quota-exceeded.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  app.useGlobalFilters(new QuotaExceededHttpFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
