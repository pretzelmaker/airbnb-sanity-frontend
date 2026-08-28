import { render } from '@testing-library/react';
import Image from '../components/Image';

// Mock the sanity module
jest.mock('../sanity');

describe('Image', () => {
  const mockImage = {
    asset: {
      _ref: 'image-abc123',
    },
  };

  it('should render with "main-image" class when identifier is "main-image"', () => {
    const { container } = render(
      <Image identifier="main-image" image={mockImage} />
    );
    const imageElement = container.querySelector('.main-image');
    expect(imageElement).toBeInTheDocument();
  });

  it('should render with "image" class when identifier is not "main-image"', () => {
    const { container } = render(
      <Image identifier="thumbnail" image={mockImage} />
    );
    const imageElement = container.querySelector('.image');
    expect(imageElement).toBeInTheDocument();
  });

  it('should render an img element', () => {
    const { container } = render(
      <Image identifier="main-image" image={mockImage} />
    );
    const imgElement = container.querySelector('img');
    expect(imgElement).toBeInTheDocument();
  });
});
