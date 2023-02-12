import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = await app.get(ConfigService);
  const port = config.get<number>("API_PORT");

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: config.get<string>("API_FRONTEND_URL"),
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
  });

  await app.listen(port || 8000, () => {
    console.log(`App started on port: ${port || 8000}`);
  });
}
bootstrap();
