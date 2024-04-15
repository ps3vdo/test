import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Category } from "./categories/category.entity";
import { config } from "dotenv";

config();
const databaseModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (): TypeOrmModuleOptions => {
    return {
      type: "postgres",
      url: process.env["egf_databaseUrl"],
      entities: [Category],
      autoLoadEntities: true,
    };
  },
});

export { databaseModule as DatabaseModule };
