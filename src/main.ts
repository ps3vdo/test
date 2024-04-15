import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "@fastify/helmet";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { ResponseInterceptor } from "./response.interceptor";
import { config } from "dotenv";
import { ValidationPipe } from "@nestjs/common";

config();
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ requestIdHeader: "request_id" }),
    { bufferLogs: true },
  );
  await app.register(helmet, {
    contentSecurityPolicy: false,
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env["egf_port"]);
}

bootstrap().catch((error) => {
  console.log(error);
});
