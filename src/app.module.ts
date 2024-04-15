import { Module } from "@nestjs/common";
import { CategoryModule } from "./categories/category.module";
import { DatabaseModule } from "./database.module";

@Module({
  imports: [CategoryModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
