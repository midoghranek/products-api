import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/core/interfaces';
import { Exists } from 'src/core/exceptions/exists';
import { NotFound } from 'src/core/exceptions/not-found';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const exist = await this.categoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (exist) throw new Exists(createCategoryDto.name);
    const newCategory = new this.categoryModel(createCategoryDto);
    return newCategory.save();
  }

  findAll() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id);
    if (!category) throw new NotFound(id);
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const exist = await this.categoryModel.findById(id);
    if (!exist) throw new NotFound(id);
    await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
    return {
      message: `Category with ID: ${id} has been updated`,
    };
  }

  async remove(id: string) {
    const exist = await this.categoryModel.findById(id);
    if (!exist) throw new NotFound(id);
    await this.categoryModel.findByIdAndRemove(id);
    return {
      message: `Category with ID: ${id} has been removed`,
    };
  }
}
