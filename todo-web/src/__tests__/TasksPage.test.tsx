import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TasksPage from '../features/tasks/pages/TasksPage';

jest.mock('../features/tasks/components/TaskFormSection', () => () => <div data-testid="task-form-section"></div>);
jest.mock('../features/tasks/components/RecentTasksSection', () => () => <div data-testid="recent-tasks-section"></div>);

describe('TasksPage', () => {
  it('renders TaskFormSection', () => {
    render(<TasksPage />);
    expect(screen.getByTestId('task-form-section')).toBeInTheDocument();
  });

  it('renders RecentTasksSection', () => {
    render(<TasksPage />);
    expect(screen.getByTestId('recent-tasks-section')).toBeInTheDocument();
  });
});
