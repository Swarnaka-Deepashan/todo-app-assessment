import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.tasksRepository.save(createTaskDto);
    return task;
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.tasksRepository.find();
    return tasks;
  }

  async findRecent(limit = 5): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { completed: false },
      // order: { createdAt: 'DESC' },
      order: { id: 'DESC' },
      take: limit
    });
  }


  async findOne(id: number) {
    const task = await this.tasksRepository.findOneBy({ id: id });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  async updateStatus(id: number, completed: boolean): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    task.completed = completed;
    return this.tasksRepository.save(task);
  }


  async markAsCompleted(id: number) {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    task.completed = true;
    const updatedTask = await this.tasksRepository.save(task);
    return updatedTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.update(id, updateTaskDto);
    return task;
  }

  async remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
