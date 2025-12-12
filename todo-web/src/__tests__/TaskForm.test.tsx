import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from '../features/tasks/components/TaskForm';

const mockCreateTask = jest.fn();
const mockReset = jest.fn();

jest.mock('../features/tasks/api/tasks.api', () => ({
  useCreateTaskMutation: () => [mockCreateTask, { isLoading: false, error: undefined }],
}));

jest.mock('react-hook-form', () => {
  const actual = jest.requireActual('react-hook-form');
  return {
    ...actual,
    useForm: () => ({
      register: jest.fn(() => ({ name: '', onChange: jest.fn() })),
      handleSubmit: (fn: any) => (e: any) => fn({ title: 'Test', description: 'Test desc' }),
      reset: mockReset,
      formState: { errors: {} },
    }),
  };
});

// Mock requestSubmit for jsdom compatibility
beforeAll(() => {
  // @ts-ignore
  if (!HTMLFormElement.prototype.requestSubmit) {
    HTMLFormElement.prototype.requestSubmit = function () {
      this.submit();
    };
  }
});

describe('TaskForm', () => {
  beforeEach(() => {
    mockCreateTask.mockReset();
    mockReset.mockReset();
  });

  it('renders form fields and button', () => {
    render(<TaskForm />);
    expect(screen.getByPlaceholderText(/task title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/task description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('disables button when loading', () => {
    jest.spyOn(require('../features/tasks/api/tasks.api'), 'useCreateTaskMutation').mockReturnValue([jest.fn(), { isLoading: true, error: undefined }]);
    render(<TaskForm />);
    // Use the actual button text when loading
    expect(screen.getByRole('button', { name: /adding/i })).toBeDisabled();
  });

  it('shows validation errors', () => {
    jest.spyOn(require('react-hook-form'), 'useForm').mockReturnValue({
      register: jest.fn(() => ({ name: '', onChange: jest.fn() })),
      handleSubmit: (fn: any) => (e: any) => fn({ title: '', description: '' }),
      reset: mockReset,
      formState: { errors: { title: { message: 'Title is required' }, description: { message: 'Description is required' } } },
    });
    render(<TaskForm />);
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Description is required')).toBeInTheDocument();
  });
});
