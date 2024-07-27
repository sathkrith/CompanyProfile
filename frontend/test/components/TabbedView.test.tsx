import React from 'react';
import { render, screen } from '@testing-library/react';
import TabbedView from '../../src/components/TabbedView';

describe('TabbedView', () => {
 
    const mockHeadquarters = {
      company_id: 1,
      location_id: 1,
      name: 'Headquarters',
      address: '123 Main St',
      latitude: 1,
      longitude: 1,
    };

  const mockLocations = [
    {
      company_id: 2,
      location_id: 2,
      name: 'Location 1',
      address: '456 Elm St',
      latitude: 2,
      longitude: 2,
    },
    {
      company_id: 3,
      location_id: 3,
      name: 'Location 2',
      address: '789 Oak St',
      latitude: 3,
      longitude: 3,
    },
  ];

  test('renders tab for headquarters', () => {
    render(<TabbedView setView={() => {}} headquarters={mockHeadquarters} locations={[]} />);

    const headquartersTab = screen.getByText(mockHeadquarters.name);

    expect(headquartersTab).toBeInTheDocument();
  });

  test('renders tabs for additional locations', () => {
    render(<TabbedView setView={() => {}} headquarters={null} locations={mockLocations} />);

    const location1Tab = screen.getByText(mockLocations[0].name);
    const location2Tab = screen.getByText(mockLocations[1].name);

    expect(location1Tab).toBeInTheDocument();
    expect(location2Tab).toBeInTheDocument();
  });

  test('does not render any tabs when there are no locations', () => {
    render(<TabbedView setView={() => {}} headquarters={null} locations={[]} />);

    const tabs = screen.queryByRole('tab');

    expect(tabs).toBeNull();
  });
});