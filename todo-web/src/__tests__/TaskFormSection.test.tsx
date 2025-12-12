import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskFormSection from '../features/tasks/components/TaskFormSection';

jest.mock('../features/tasks/components/SectionHeader', () => (props: any) => <div data-testid="section-header">{props.text}</div>);
jest.mock('../features/tasks/components/TaskForm', () => () => <form data-testid="task-form"></form>);

describe('TaskFormSection', () => {
  it('renders SectionHeader with correct text', () => {
    render(<TaskFormSection />);
    expect(screen.getByTestId('section-header')).toHaveTextContent('Add Task');
  });

  it('renders TaskForm', () => {
    render(<TaskFormSection />);
    expect(screen.getByTestId('task-form')).toBeInTheDocument();
  });
});
