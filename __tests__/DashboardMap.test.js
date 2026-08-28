import { render } from '@testing-library/react';
import DashboardMap from '../components/DashboardMap';

// Mock the Google Maps API
jest.mock('@react-google-maps/api');

describe('DashboardMap', () => {
  const mockProperties = [
    {
      location: {
        lat: 40.7128,
        lng: -74.0060,
      },
    },
    {
      location: {
        lat: 34.0522,
        lng: -118.2437,
      },
    },
  ];

  it('should render without crashing when not loaded', () => {
    const { container } = render(<DashboardMap properties={mockProperties} />);
    expect(container).toBeInTheDocument();
  });

  it('should accept properties array prop', () => {
    const { container } = render(<DashboardMap properties={mockProperties} />);
    expect(container).toBeInTheDocument();
  });
});
