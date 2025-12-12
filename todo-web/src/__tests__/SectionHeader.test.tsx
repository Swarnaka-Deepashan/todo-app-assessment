import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SectionHeader from '../features/tasks/components/SectionHeader';

describe('SectionHeader', () => {
  it('renders default text when no prop is given', () => {
    render(<SectionHeader />);
    expect(screen.getByText('Section Header')).toBeInTheDocument();
  });

  it('renders custom text when prop is given', () => {
    render(<SectionHeader text="My Custom Header" />);
    expect(screen.getByText('My Custom Header')).toBeInTheDocument();
  });
});
