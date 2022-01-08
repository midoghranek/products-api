import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  avatar: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  role: 'manager' | 'editor';

  @Prop({ required: true, type: String })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
