import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

describe('TasksService', () => {
  let service: TasksService;
  let repository: jest.Mocked<Repository<Task>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get(getRepositoryToken(Task));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a task', async () => {
      const createTaskDto: CreateTaskDto = { title: 'Test Task', description: 'Desc' };
      const savedTask = { id: 1, ...createTaskDto, completed: false, createdAt: new Date(), updatedAt: new Date() } as Task;

      repository.save.mockResolvedValue(savedTask);

      const result = await service.create(createTaskDto);

      expect(repository.save).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual(savedTask);
    });
  });

  describe('findRecent', () => {
    it('should return the most recent 5 tasks by default', async () => {
      const mockTasks: Task[] = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        title: `Task ${i + 1}`,
        description: `Desc ${i + 1}`,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Task));

      repository.find.mockResolvedValue(mockTasks);

      const result = await service.findRecent();

      expect(repository.find).toHaveBeenCalledWith({
        where: { completed: false },
        // order: { createdAt: 'DESC' },
        order: { id: 'DESC' },
        take: 5,
      });
      expect(result).toEqual(mockTasks);
    });

    it('should allow specifying a custom limit', async () => {
      const mockTasks: Task[] = [
        { id: 1, title: 'Task 1', description: 'Desc', completed: false, createdAt: new Date(), updatedAt: new Date() } as Task,
      ];

      repository.find.mockResolvedValue(mockTasks);

      const result = await service.findRecent(1);

      expect(repository.find).toHaveBeenCalledWith({
        where: { completed: false },
        // order: { createdAt: 'DESC' },
        order: { id: 'DESC' },
        take: 1,
      });
      expect(result).toEqual(mockTasks);
    });
  });

  describe('updateStatus', () => {
    it('should update a task status to completed', async () => {
      const task = { id: 1, title: 'Test', description: 'Desc', completed: false } as Task;
      const updatedTask = { ...task, completed: true };

      repository.findOneBy.mockResolvedValue(task);
      repository.save.mockResolvedValue(updatedTask);

      const result = await service.updateStatus(1, true);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(repository.save).toHaveBeenCalledWith(updatedTask);
      expect(result).toEqual(updatedTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      // repository.findOneBy.mockResolvedValue(undefined);
      repository.findOneBy.mockResolvedValue(null);

      await expect(service.updateStatus(1, true)).rejects.toThrow(NotFoundException);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });
});



// import { Test, TestingModule } from '@nestjs/testing';
// import { TasksService } from './tasks.service';

// describe('TasksService', () => {
//   let service: TasksService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [TasksService],
//     }).compile();

//     service = module.get<TasksService>(TasksService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
