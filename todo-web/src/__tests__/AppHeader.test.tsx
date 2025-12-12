import React from 'react';
import { render, screen } from '@testing-library/react';
import AppHeader from '../features/tasks/components/AppHeader';

describe('AppHeader', () => {
  it('renders the header with the correct text', () => {
    render(<AppHeader />);
    expect(screen.getByText('TaskPilot')).toBeInTheDocument();
  });
});
