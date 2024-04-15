import { Injectable } from "@nestjs/common";
import {
  CreateCategoryDto,
  SearchDto,
  UpdateCategoryDto,
} from "./category.dto";
import { CategoryRepository } from "./category.repo";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService {
  constructor(private repo: CategoryRepository) {}

  private isID(id: string) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id,
    );
  }
  async getCategory(id: string) {
    let record: Category;

    if (this.isID(id)) {
      record = await this.repo.getById(id);
    } else {
      record = await this.repo.getBySlug(id);
    }

    if (!record) {
      throw new Error("Category not found");
    }

    return record;
  }
  async search(body: SearchDto) {
    return this.repo.search(body);
  }

  async create(body: CreateCategoryDto) {
    return this.repo.create(body);
  }

  async update(id: string, body: UpdateCategoryDto) {
    return this.repo.update(id, body);
  }
  async delete(id: string) {
    return this.repo.delete(id);
  }
}
