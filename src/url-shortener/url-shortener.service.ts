import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  UrlShortener,
  UrlShortenerDocument,
} from './entities/url-shortener.schema';
import { Model } from 'mongoose';

@Injectable()
export class UrlShortenerService {
  constructor(
    @InjectModel(UrlShortener.name)
    private urlShortenerModel: Model<UrlShortenerDocument>,
  ) {}

  async shortenUrl(originalUrl: string): Promise<string> {
    try {
      const existingUrl = await this.urlShortenerModel.findOne({
        originalUrl,
      });
      if (existingUrl) {
        return `${process.env.NEXT_PUBLIC_BACKEND_URL}/s/${existingUrl.shortCode}`;
      }
      const shortCode = this.generateShortCode(8);
      const shortUrl = new this.urlShortenerModel({
        originalUrl,
        shortCode,
      });
      await shortUrl.save();
      return `${process.env.NEXT_PUBLIC_BACKEND_URL}/s/${shortCode}`;
    } catch (error) {
      console.error(error);
      throw new Error(`Error creating a shorten url: ${error.message}`);
    }
  }

  generateShortCode(codeNb: number): string {
    try {
      let code = '';
      const chars =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (let i = 0; i < codeNb; i++) {
        const random = Math.floor(Math.random() * 62);
        code += chars[random];
      }
      return code;
    } catch (error) {
      console.error(error);
      throw new Error(`Error generating a short code: ${error.message}`);
    }
  }

  async getOriginalUrl(shortCode: string): Promise<string> {
    try {
      const shortUrl = await this.urlShortenerModel
        .findOne({ shortCode })
        .exec();
      if (!shortUrl) {
        throw new NotFoundException('Short URL not found');
      }
      shortUrl.clicks += 1;
      await shortUrl.save();
      return shortUrl.originalUrl;
    } catch (error) {
      console.error(error);
      throw new Error(`Error getting original url: ${error.message}`);
    }
  }
}
