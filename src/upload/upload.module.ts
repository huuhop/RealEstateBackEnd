import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [
      ItemModule
    ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
