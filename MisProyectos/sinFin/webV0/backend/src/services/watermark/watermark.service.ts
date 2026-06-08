import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class WatermarkService {
  private enabled: boolean;
  private watermarkText: string;
  private watermarkLogoPath: string | null;

  constructor(private configService: ConfigService) {
    this.enabled = this.configService.get<string>('WATERMARK_ENABLED', 'true') === 'true';
    this.watermarkText = this.configService.get<string>('WATERMARK_TEXT', 'Talleristas');
    this.watermarkLogoPath = this.configService.get<string>('WATERMARK_LOGO_PATH') || null;
  }

  async applyWatermark(buffer: Buffer): Promise<Buffer> {
    if (!this.enabled) {
      return buffer;
    }

    const image = sharp(buffer);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      return buffer;
    }

    // Intentar usar logo si existe
    if (this.watermarkLogoPath) {
      try {
        return await this.applyLogoWatermark(image, metadata);
      } catch (error) {
        console.warn('Could not apply logo watermark, falling back to text:', error);
      }
    }

    // Usar watermark de texto
    return this.applyTextWatermark(image, metadata);
  }

  private async applyTextWatermark(
    image: sharp.Sharp,
    metadata: sharp.Metadata,
  ): Promise<Buffer> {
    const width = metadata.width!;
    const height = metadata.height!;

    // Calcular tamaño de fuente basado en el tamaño de imagen
    const fontSize = Math.max(16, Math.min(48, Math.floor(width / 20)));
    const padding = Math.floor(fontSize / 2);

    // Crear SVG con el texto
    const svgText = `
      <svg width="${width}" height="${height}">
        <style>
          .watermark {
            fill: rgba(255, 255, 255, 0.4);
            font-family: Arial, sans-serif;
            font-size: ${fontSize}px;
            font-weight: bold;
          }
        </style>
        <text
          x="${width - padding}"
          y="${height - padding}"
          text-anchor="end"
          class="watermark"
        >${this.watermarkText}</text>
      </svg>
    `;

    return image
      .composite([
        {
          input: Buffer.from(svgText),
          gravity: 'southeast',
        },
      ])
      .jpeg({ quality: 90 })
      .toBuffer();
  }

  private async applyLogoWatermark(
    image: sharp.Sharp,
    metadata: sharp.Metadata,
  ): Promise<Buffer> {
    const width = metadata.width!;
    const height = metadata.height!;

    // Leer logo
    const logoPath = path.resolve(this.watermarkLogoPath!);
    const logoBuffer = await fs.readFile(logoPath);

    // Redimensionar logo a ~10% del ancho de la imagen
    const logoWidth = Math.floor(width * 0.1);
    const resizedLogo = await sharp(logoBuffer)
      .resize(logoWidth)
      .ensureAlpha()
      .toBuffer();

    // Aplicar transparencia al logo (~40%)
    const logoWithOpacity = await sharp(resizedLogo)
      .composite([
        {
          input: Buffer.from([255, 255, 255, 102]), // 40% opacity
          raw: {
            width: 1,
            height: 1,
            channels: 4,
          },
          tile: true,
          blend: 'dest-in',
        },
      ])
      .toBuffer();

    return image
      .composite([
        {
          input: logoWithOpacity,
          gravity: 'southeast',
        },
      ])
      .jpeg({ quality: 90 })
      .toBuffer();
  }
}
