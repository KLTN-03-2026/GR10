import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
  // Hiển thị bài viết
  @Prop({ type: String, required: true, trim: true })
  title!: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  slug!: string;

  @Prop({ type: String, required: true })
  short_description!: string;

  @Prop({ type: String, required: true })
  cover_image!: string;

  @Prop({ type: String, required: true })
  content!: string;

  // Tác giả
  @Prop({ type: String, required: true, trim: true })
  author!: string;

  // SEO
  @Prop({ type: String, trim: true })
  meta_title?: string;

  @Prop({ type: String })
  meta_description?: string;

  @Prop({ type: [String], default: [] })
  keywords!: string[];

  @Prop({ type: String })
  og_image?: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

