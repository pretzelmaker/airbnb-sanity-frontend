import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';

describe('NavBar', () => {
  it('should render the navigation bar', () => {
    const { container } = render(<NavBar />);
    const navElement = container.querySelector('.nav');
    expect(navElement).toBeInTheDocument();
  });

  it('should render the logo element', () => {
    const { container } = render(<NavBar />);
    const logoElement = container.querySelector('.logo');
    expect(logoElement).toBeInTheDocument();
  });
});
