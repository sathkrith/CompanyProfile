import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route } from 'react-router-dom';
import CompanyDetails from '../../src/components/CompanyDetails';

jest.mock('axios');

describe('CompanyDetails', () => {
  const mockCompany = {
    id: '1',
    name: 'Example Company',
    address: '123 Main St',
    latitude: 1,
    longitude: 1,
  };

  const mockLocations = [
    {
      id: '1',
      name: 'Location 1',
      address: '456 Elm St',
      latitude: 2,
      longitude: 2,
    },
    {
      id: '2',
      name: 'Location 2',
      address: '789 Oak St',
      latitude: 3,
      longitude: 3,
    },
  ];

  beforeEach(() => {
    (axios.get as jest.Mock).mockImplementation((url) => {
      if (url === `/api/companies/${mockCompany.id}`) {
        return Promise.resolve({ data: { company: mockCompany } });
      } else if (url === `/api/companies/${mockCompany.id}/locations`) {
        return Promise.resolve({ data: { locations: mockLocations } });
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders company name and address', async () => {
    render(
      <MemoryRouter initialEntries={[`/companies/${mockCompany.id}`]}>
        <Route path="/companies/:id">
          <CompanyDetails />
        </Route>
      </MemoryRouter>
    );

    const companyNameElement = await screen.findByText(mockCompany.name);
    const companyAddressElement = await screen.findByText(mockCompany.address);

    expect(companyNameElement).toBeInTheDocument();
    expect(companyAddressElement).toBeInTheDocument();
  });

  test('renders back button', async () => {
    render(
      <MemoryRouter initialEntries={[`/companies/${mockCompany.id}`]}>
        <Route path="/companies/:id">
          <CompanyDetails />
        </Route>
      </MemoryRouter>
    );

    const backButton = await screen.findByRole('button', { name: 'Back to List' });

    expect(backButton).toBeInTheDocument();
  });

  test('renders locations', async () => {
    render(
      <MemoryRouter initialEntries={[`/companies/${mockCompany.id}`]}>
        <Route path="/companies/:id">
          <CompanyDetails />
        </Route>
      </MemoryRouter>
    );

    const location1Element = await screen.findByText(mockLocations[0].name);
    const location2Element = await screen.findByText(mockLocations[1].name);

    expect(location1Element).toBeInTheDocument();
    expect(location2Element).toBeInTheDocument();
  });
});