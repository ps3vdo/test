import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Category } from "./category.entity";
import {
  CreateCategoryDto,
  SearchDto,
  UpdateCategoryDto,
} from "./category.dto";

@Injectable()
export class CategoryRepository {
  private category: Repository<Category>;

  fieldNames: string[] = [
    "id",
    "slug",
    "name",
    "description",
    "active",
    "created_date",
  ];

  constructor(private dataSource: DataSource) {
    this.category = this.dataSource.getRepository<Category>(Category);
  }

  async getById(id: string) {
    return this.category.findOne({
      where: { id },
    });
  }

  async getBySlug(slug: string) {
    return this.category.findOne({
      where: { slug },
    });
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    return this.category.save(data);
  }

  async update(id: string, data: UpdateCategoryDto): Promise<Category | null> {
    await this.category.update({ id }, data);

    return this.category.findOne({ where: { id } });
  }

  async delete(id: string) {
    await this.category.delete(id);
  }

  async search(params: SearchDto) {
    const mainQuery = this.dataSource
      .createQueryBuilder()
      .from("category", "category")
      .select(this.fieldNames.map((el) => `category.${el} AS ${el}`));

    if (params.search) {
      params.search = params.search.replaceAll("е", "[е|ё]");
      mainQuery
        .where("name SIMILAR TO :searchQuery", {
          searchQuery: `%${params.search}%`,
        })
        .orWhere("description SIMILAR TO :searchQuery", {
          searchQuery: `%${params.search}%`,
        });
    } else {
      if (params.name) {
        params.name = params.name.replaceAll("е", "[е|ё]");
        mainQuery.andWhere("category.name SIMILAR TO :name", {
          name: params.name,
        });
      }
      if (params.description) {
        params.description = params.description.replaceAll("е", "[е|ё]");

        mainQuery.andWhere("category.description SIMILAR TO :description", {
          description: params.description,
        });
      }
    }
    if (params.active)
      mainQuery.andWhere("category.active = :active", {
        active: params.active,
      });

    if (params.sort) {
      const sortType = params.sort.startsWith("-") ? "DESC" : "ASC";
      const field = params.sort.replace("-", "");
      const searchField = this.fieldNames.find((item) => item === field);

      if (searchField) mainQuery.orderBy(searchField, sortType);
      else mainQuery.orderBy("created_date", "DESC");
    } else mainQuery.orderBy("created_date", "DESC");

    const count = await mainQuery.getCount();

    if (!params.pageSize) params.pageSize = 2;
    if (params.page === 1) {
      params.page = 0;
    } else if (params.page > 1) params.page = --params.page;

    const result = await mainQuery
      .limit(params.pageSize)
      .offset(params.page)
      .getRawMany();
    return { result, count };
  }
}
