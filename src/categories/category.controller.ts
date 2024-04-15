import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import {
  CreateCategoryDto,
  GetByIdDto,
  GetByIdOrSlugDto,
  SearchDto,
  UpdateCategoryDto,
} from "./category.dto";

@Controller("category")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get(":id")
  async getOne(@Param() params: GetByIdOrSlugDto) {
    return this.categoryService.getCategory(params.id);
  }

  @Get()
  async search(@Query() query: SearchDto) {
    return this.categoryService.search(query);
  }

  @Post()
  async create(@Body() body: CreateCategoryDto): Promise<any> {
    return this.categoryService.create(body);
  }

  @Patch(":id")
  async update(
    @Param() params: GetByIdDto,
    @Body() body: UpdateCategoryDto,
  ): Promise<boolean> {
    await this.categoryService.update(params.id, body);

    return true;
  }

  @Delete(":id")
  async delete(@Param() params: GetByIdDto): Promise<boolean> {
    await this.categoryService.delete(params.id);

    return true;
  }
}
