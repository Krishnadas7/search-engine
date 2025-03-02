import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  genre: string;

  @Prop()
  publicationYear: number;

  @Prop()
  description?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
