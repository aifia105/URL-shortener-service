import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';
import { Response } from 'express';

@Controller('url-shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortener: UrlShortenerService) {}

  @Post()
  async shortenUrl(@Body('originalUrl') originalUrl: string): Promise<string> {
    try {
      const shortUrl = await this.urlShortener.shortenUrl(originalUrl);
      return shortUrl;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: error.message,
        },
        HttpStatus.NOT_ACCEPTABLE,
        {
          cause: error,
        },
      );
    }
  }

  @Post('s/:shortCode')
  async redirectToOriginalUrl(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
  ) {
    try {
      const originalUrl = await this.urlShortener.getOriginalUrl(shortCode);
      return res.redirect(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${originalUrl}`,
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }
}
