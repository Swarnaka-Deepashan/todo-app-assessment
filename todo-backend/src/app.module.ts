import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'localhost',
      host: 'db',
      port: 3306,
      // username: 'root',
      // password: 'Iphone14Pro',
      // database: 'todo_db',
      username: 'app_user',
      password: 'app_pass',
      database: 'app_db',
      entities: [Task],
      // synchronize: true shouldn't be used in production - may lose data
      synchronize: true,
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { constructor(private dataSource: DataSource) { } }
