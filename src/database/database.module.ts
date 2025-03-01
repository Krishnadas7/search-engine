import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
console.log(process.env.DB_URL);

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL as string || "mongodb://127.0.0.1:27017/nestjs-app"),
  ],
})
export class DatabaseModule implements OnModuleInit {
  private readonly logger = new Logger(DatabaseModule.name);

  async onModuleInit() {
    try {
      await mongoose.connection.asPromise();
      this.logger.log('MongoDB Connected Successfully');
    } catch (err) {
      this.logger.error('MongoDB Connection Error:', err);
    }
  }
}

