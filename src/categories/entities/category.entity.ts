import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Category {
  @Prop({ required: true, type: String, unique: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
