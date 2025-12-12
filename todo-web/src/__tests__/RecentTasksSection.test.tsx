import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentTasksSection from '../features/tasks/components/RecentTasksSection';

jest.mock('../features/tasks/components/SectionHeader', () => (props: any) => <div data-testid="section-header">{props.text}</div>);
jest.mock('../features/tasks/components/TaskList', () => () => <div data-testid="task-list"></div>);

describe('RecentTasksSection', () => {
  it('renders SectionHeader with default or custom text', () => {
    render(<RecentTasksSection />);
    expect(screen.getByTestId('section-header')).toBeInTheDocument();
  });

  it('renders TaskList', () => {
    render(<RecentTasksSection />);
    expect(screen.getByTestId('task-list')).toBeInTheDocument();
  });
});
