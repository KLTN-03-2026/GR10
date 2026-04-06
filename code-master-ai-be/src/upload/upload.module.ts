import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';

@Module({
  providers: [UploadService],
  exports: [UploadService] // Dòng này quan trọng: Mở cửa cho module khác xài ké Service
})
export class UploadModule {}