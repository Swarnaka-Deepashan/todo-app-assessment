import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskCardSkeleton from '../features/tasks/components/TaskCardSkeleton';

describe('TaskCardSkeleton', () => {
  it('renders the skeleton UI', () => {
    render(<TaskCardSkeleton />);
    // Check for a skeleton element, e.g. by class or text
    // Adjust selector as needed for your skeleton markup
    expect(screen.getByTestId('task-card-skeleton')).toBeInTheDocument();
  });
});
