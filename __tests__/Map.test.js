import { render } from '@testing-library/react';
import Map from '../components/Map';

// Mock the Google Maps API
jest.mock('@react-google-maps/api');

describe('Map', () => {
  const mockLocation = {
    lat: 40.7128,
    lng: -74.0060,
  };

  it('should render without crashing when not loaded', () => {
    const { container } = render(<Map location={mockLocation} />);
    expect(container).toBeInTheDocument();
  });

  it('should accept location prop with lat and lng', () => {
    const { container } = render(<Map location={mockLocation} />);
    expect(container).toBeInTheDocument();
  });
});
