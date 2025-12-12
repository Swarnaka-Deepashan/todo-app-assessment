import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskCard from '../features/tasks/components/TaskCard';

// Mock the useMarkDoneMutation hook
jest.mock('../features/tasks/api/tasks.api', () => ({
  useMarkDoneMutation: () => [jest.fn(), { isLoading: false, isError: false }],
}));

describe('TaskCard', () => {
  const defaultProps = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
  };

  it('renders title and description', () => {
    render(<TaskCard {...defaultProps} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders Done button', () => {
    render(<TaskCard {...defaultProps} />);
    expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument();
  });

  it('calls markDone when Done button is clicked', () => {
    const mockMarkDone = jest.fn().mockReturnValue({ unwrap: jest.fn() });
    jest.spyOn(require('../features/tasks/api/tasks.api'), 'useMarkDoneMutation').mockReturnValue([mockMarkDone, { isLoading: false, isError: false }]);
    render(<TaskCard {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /done/i }));
    expect(mockMarkDone).toHaveBeenCalled();
  });

  it('disables Done button when loading', () => {
    jest.spyOn(require('../features/tasks/api/tasks.api'), 'useMarkDoneMutation').mockReturnValue([jest.fn(), { isLoading: true, isError: false }]);
    render(<TaskCard {...defaultProps} />);
    expect(screen.getByRole('button', { name: /done/i })).toBeDisabled();
  });
});
