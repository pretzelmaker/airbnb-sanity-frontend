import { render, screen } from '@testing-library/react';
import Review from '../components/Review';

// Mock the sanity module
jest.mock('../sanity');

describe('Review', () => {
  const mockReview = {
    rating: 4.5,
    traveller: {
      name: 'John Doe',
      image: {
        asset: {
          _ref: 'image-abc123',
        },
      },
    },
  };

  it('should render the rating', () => {
    render(<Review review={mockReview} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('should render the traveller name', () => {
    render(<Review review={mockReview} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render the review box with correct class', () => {
    const { container } = render(<Review review={mockReview} />);
    const reviewBox = container.querySelector('.review-box');
    expect(reviewBox).toBeInTheDocument();
  });

  it('should render an img element for the traveller', () => {
    const { container } = render(<Review review={mockReview} />);
    const imgElement = container.querySelector('img');
    expect(imgElement).toBeInTheDocument();
  });
});
