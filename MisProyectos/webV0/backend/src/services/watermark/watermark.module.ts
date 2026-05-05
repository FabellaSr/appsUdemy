import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WatermarkService } from './watermark.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [WatermarkService],
  exports: [WatermarkService],
})
export class WatermarkModule {}
