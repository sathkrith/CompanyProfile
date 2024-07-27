import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CompanyCard from '../../src/components/CompanyCard';

const mockCompany = {
  name: 'Example Company',
  address: '123 Main St',
    company_id: 1,
    latitude: 1,
    longitude:1,
};

test('renders company name and address', () => {
  render(<CompanyCard company={mockCompany} onClick={() => {}} />);
  
  const companyNameElement = screen.getByText(mockCompany.name);
  const companyAddressElement = screen.getByText(mockCompany.address);
  
  expect(companyNameElement).toBeInTheDocument();
  expect(companyAddressElement).toBeInTheDocument();
});

test('calls onClick when card is clicked', () => {
  const onClickMock = jest.fn();
  render(<CompanyCard company={mockCompany} onClick={onClickMock} />);
  
  const cardElement = screen.getByTestId('company-card');
  fireEvent.click(cardElement);
  
  expect(onClickMock).toHaveBeenCalled();
});