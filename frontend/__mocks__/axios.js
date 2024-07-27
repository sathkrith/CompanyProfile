
const mockAxios = jest.genMockFromModule('axios');

// Mock the axios.create method to return the mock axios instance
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
