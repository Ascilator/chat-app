import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import cors from 'cors';

async function start() {
  const PORT = process.env.APP_PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
