import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Get('recent')
  async getRecentTasks() {
    const tasks = await this.tasksService.findRecent();
  return tasks;
}


  // @Get(':id/complete')
  // async markAsCompleted(@Param('id', ParseIntPipe) id: number) {
  //   return await this.tasksService.markAsCompleted(id);
  // }

  @Patch(':id/complete')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('completed') completed: boolean
  ) {
    const updatedTask = await this.tasksService.updateStatus(id, completed);
    return updatedTask;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.findOne(id);
  }

  
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.remove(id);
  }
}
