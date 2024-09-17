import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UrlShortenerDocument = UrlShortener & Document;

@Schema({ timestamps: true })
export class UrlShortener {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  shortCode: string;

  @Prop({ default: 0 })
  clicks: number;
}

export const UrlShortenerSchema = SchemaFactory.createForClass(UrlShortener);
