import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../features/tasks/components/TaskList';

jest.mock('../features/tasks/components/TaskCard', () => (props: any) => <div data-testid="task-card">{props.title}</div>);
jest.mock('../features/tasks/components/TaskCardSkeleton', () => () => <div data-testid="task-card-skeleton">Loading...</div>);

const mockUseFetchRecentTasksQuery = jest.fn();
jest.mock('../features/tasks/api/tasks.api', () => ({
  useFetchRecentTasksQuery: () => mockUseFetchRecentTasksQuery(),
}));

describe('TaskList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows skeletons when loading', () => {
    mockUseFetchRecentTasksQuery.mockReturnValue({ isLoading: true });
    render(<TaskList />);
    expect(screen.getAllByTestId('task-card-skeleton')).toHaveLength(5);
  });

  it('shows error message when error', () => {
    mockUseFetchRecentTasksQuery.mockReturnValue({ isLoading: false, isError: true });
    render(<TaskList />);
    expect(screen.getByText(/error fetching tasks/i)).toBeInTheDocument();
  });

  it('shows empty message when no tasks', () => {
    mockUseFetchRecentTasksQuery.mockReturnValue({ isLoading: false, isError: false, data: [] });
    render(<TaskList />);
    expect(screen.getByText(/no recent tasks/i)).toBeInTheDocument();
  });

  it('renders TaskCard for each task', () => {
    const tasks = [
      { id: 1, title: 'Task 1', description: 'Desc 1' },
      { id: 2, title: 'Task 2', description: 'Desc 2' },
    ];
    mockUseFetchRecentTasksQuery.mockReturnValue({ isLoading: false, isError: false, data: tasks });
    render(<TaskList />);
    expect(screen.getAllByTestId('task-card')).toHaveLength(2);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
