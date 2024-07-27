import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import CompanyList from '../../src/components/CompanyList';

jest.mock('axios');

describe('CompanyList', () => {
  const mockCompanies = [
    {
      company_id: 1,
      name: 'Company 1',
    },
    {
      company_id: 2,
      name: 'Company 2',
    },
  ];

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { companies: mockCompanies } });
  });

  test('renders company list', async () => {
    render(
      <MemoryRouter>
        <CompanyList />
      </MemoryRouter>
    );

    await waitFor(() => {
      const company1Element = screen.getByText('Company 1');
      const company2Element = screen.getByText('Company 2');

      expect(company1Element).toBeInTheDocument();
      expect(company2Element).toBeInTheDocument();
    });
  });

  test('renders "No companies found" when no companies match the search', async () => {
    render(
      <MemoryRouter>
        <CompanyList />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search companies...');
    (searchInput as HTMLInputElement).value = 'Non-existent Company';
    searchInput.dispatchEvent(new Event('input'));

    await waitFor(() => {
      const noCompaniesFoundElement = screen.getByText('No companies found');

      expect(noCompaniesFoundElement).toBeInTheDocument();
    });
  });
});