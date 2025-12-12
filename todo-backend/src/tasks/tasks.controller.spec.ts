import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TasksModule } from './tasks.module';
import { Task } from './entities/task.entity';

describe('TasksController (Integration)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        TasksModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Task],
          synchronize: true,
          dropSchema: true, // Add this for clean state
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();

    dataSource = app.get<DataSource>(getDataSourceToken());
  });

  afterAll(async () => {
    // Close database connection first
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
    }
    
    // Then close the app
    if (app) {
      await app.close();
    }
  });

  beforeEach(async () => {
    // Clear tasks table before each test
    await dataSource.getRepository(Task).clear();
  });

  describe('POST /tasks', () => {
    it('should create a task successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'Test Task', description: 'Test description' })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Task');
      expect(response.body.description).toBe('Test description');
      expect(response.body.completed).toBe(false);
    });

    it('should fail when title is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send({ description: 'No title' })
        .expect(400);

      expect(response.body.message).toContain('title should not be empty');
    });

    it('should fail when title is not a string', async () => {
      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 123, description: 'Invalid title type' })
        .expect(400);

      expect(response.body.message).toContain('title must be a string');
    });
  });

  describe('GET /tasks/recent', () => {
    it('should return up to 5 recent tasks, excluding completed', async () => {
      // Create 6 tasks
      for (let i = 1; i <= 6; i++) {
        await request(app.getHttpServer())
          .post('/tasks')
          .send({ title: `Task ${i}` });
      }

      // Mark Task 3 as completed
      await request(app.getHttpServer()).patch('/tasks/3/complete').send({ completed: true });

      const response = await request(app.getHttpServer())
        .get('/tasks/recent')
        .expect(200);

      expect(response.body.length).toBeLessThanOrEqual(5);
      expect(response.body.some((t) => t.id === 3)).toBe(false);
      console.log(response.body);
      expect(response.body[0].title).toBe('Task 6'); // Most recent
    });

    it('should return empty array if no tasks exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/tasks/recent')
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });

  describe('PATCH /tasks/:id/complete', () => {
    it('should mark a task as completed', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'Complete me' });

      const taskId = createRes.body.id;

      const patchRes = await request(app.getHttpServer())
        .patch(`/tasks/${taskId}/complete`)
        .send({ completed: true })
        .expect(200);

      expect(patchRes.body.completed).toBe(true);
    });

    it('should return 404 for non-existing task', async () => {
      const response = await request(app.getHttpServer())
        .patch('/tasks/999/complete')
        .send({ completed: true })
        .expect(404);

      expect(response.body.message).toBeDefined();
    });
  });
});