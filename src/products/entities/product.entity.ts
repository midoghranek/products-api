import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from 'src/core/interfaces';

@Schema({ versionKey: false })
export class Product {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  price: number;

  @Prop({ required: true, type: String })
  image: string;

  @Prop({ required: true, type: Category })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
