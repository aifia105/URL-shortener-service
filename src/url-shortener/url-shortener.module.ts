import { Module } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerController } from './url-shortener.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UrlShortener,
  UrlShortenerSchema,
} from './entities/url-shortener.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UrlShortener.name,
        schema: UrlShortenerSchema,
      },
    ]),
  ],
  providers: [UrlShortenerService],
  controllers: [UrlShortenerController],
})
export class UrlShortenerModule {}
