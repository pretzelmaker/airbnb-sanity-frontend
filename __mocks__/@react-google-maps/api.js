const React = require('react');

const useJsApiLoader = jest.fn(() => ({
  isLoaded: false,
  loadError: null,
}));

const GoogleMap = jest.fn(({ children }) => 
  React.createElement('div', { 'data-testid': 'google-map' }, children)
);

const Marker = jest.fn(() => 
  React.createElement('div', { 'data-testid': 'marker' })
);

module.exports = {
  useJsApiLoader,
  GoogleMap,
  Marker,
};
