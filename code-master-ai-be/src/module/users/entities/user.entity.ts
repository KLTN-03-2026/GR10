import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop() 
  name?: string; 

  @Prop({ unique: true, sparse: true }) 
  username?: string;

  @Prop({ required: true, unique: true }) 
  email!: string; 

  @Prop()
  password!: string;

  @Prop() 
  image?: string;

  @Prop()
  googleId?: string;

  @Prop({ default: 'local' }) 
  provider?: string;

  @Prop() 
  phone?: string;

  @Prop({ type: Types.ObjectId, ref: 'Role' }) 
  role_id?: Types.ObjectId;

  @Prop({ default: 'active' }) 
  status?: string;
  
  @Prop({ type: String, default: null })
  refreshToken?: string; // Lưu token để đối chiếu

  // CÁC TRƯỜNG DÙNG CHO XÁC THỰC
  @Prop({ default: false })
  isActive!: boolean; 

  @Prop()
  codeId?: string;

  @Prop()
  codeExpired?: Date; 
}

export const UserSchema = SchemaFactory.createForClass(User);