import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets(join(__dirname, '..', 'uploads'));
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port, () => {
    console.log(`SERVERK WORK ON PORT: ${port}`);
  });
}
bootstrap();
