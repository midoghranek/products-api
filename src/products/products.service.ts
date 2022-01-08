import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/core/interfaces';
import { Exists } from 'src/core/exceptions/exists';
import { NotFound } from 'src/core/exceptions/not-found';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const exist = await this.productModel.findOne({
      name: createProductDto.name,
    });
    if (exist) throw new Exists(createProductDto.name);
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const exist = await this.productModel.findById(id);
    if (!exist) throw new NotFound(id);
    return this.productModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const exist = await this.productModel.findById(id);
    if (!exist) throw new NotFound(id);
    await this.productModel.findByIdAndUpdate(id, updateProductDto);
    return this.productModel.findById(id);
  }

  async remove(id: string) {
    const exist = await this.productModel.findById(id);
    if (!exist) throw new NotFound(id);
    await this.productModel.findByIdAndRemove(id);
    return {
      message: `Product with ID: ${id} has been removed`,
    };
  }
}
