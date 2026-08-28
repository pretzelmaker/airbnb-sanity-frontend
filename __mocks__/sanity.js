const mockUrlFor = jest.fn((source) => ({
  auto: jest.fn().mockReturnThis(),
  width: jest.fn().mockReturnThis(),
  height: jest.fn().mockReturnThis(),
  crop: jest.fn().mockReturnThis(),
  url: jest.fn().mockReturnValue('https://example.com/image.jpg'),
  toString: jest.fn().mockReturnValue('https://example.com/image.jpg'),
}));

const mockSanityClient = {
  fetch: jest.fn(),
};

module.exports = {
  urlFor: mockUrlFor,
  sanityClient: mockSanityClient,
};
