import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
<<<<<<< HEAD
  @Prop({ required: true, unique: true })
  role_name!: string;
  @Prop() description: string;
=======
  @Prop({ required: true, unique: true }) 
  role_name!: string;
  @Prop() description!: string;
>>>>>>> 346bb36e7977a31228eb3b08959be79a54710e4a
}
export const RoleSchema = SchemaFactory.createForClass(Role);
