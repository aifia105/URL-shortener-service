import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors configuration
  app.enableCors({
    origin: process.env.NEST_PUBLIC_FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  //To access to your files with NestJs you need to define your static assets directory name in the main.ts

  // Start the Nest application
  const PORT = process.env.PORT;

  await app.listen(PORT);
  console.log(
    '--------------------------------------------------------------------------------------',
  );
  console.log(
    `Server running on port ${PORT} and you can access the API at http://localhost:${PORT}`,
  );
  console.log(
    '--------------------------------------------------------------------------------------',
  );
  console.log(
    `Swagger documentation available at http://localhost:${PORT}/api`,
  );
  console.log(
    '--------------------------------------------------------------------------------------',
  );
  console.log(`MongoDB connection string: ${process.env.MONGODB_URI}`);
  console.log(
    '--------------------------------------------------------------------------------------',
  );
}
bootstrap();
