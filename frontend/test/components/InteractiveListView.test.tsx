import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InteractiveListView from '../../src/components/InteractiveListView';

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

test('renders InteractiveListView component', () => {
  render(
    <InteractiveListView
      setView={() => {}}
      headquarters={mockHeadquarters}
      locations={mockLocations}
      selectedLocation={null}
      onLocationClick={() => {}}
    />
  );

  const typeaheadElement = screen.getByLabelText('Choose a location...');
  const mapElement = screen.getByTestId('map-component');

  expect(typeaheadElement).toBeInTheDocument();
  expect(mapElement).toBeInTheDocument();
});

test('displays selected location on map', () => {
  render(
    <InteractiveListView
      setView={() => {}}
      headquarters={mockHeadquarters}
      locations={mockLocations}
      selectedLocation={mockLocations[0]}
      onLocationClick={() => {}}
    />
  );

  const mapElement = screen.getByTestId('map-component');
  const selectedLocationMarker = screen.getByTestId('selected-location-marker');

  expect(mapElement).toBeInTheDocument();
  expect(selectedLocationMarker).toBeInTheDocument();
});

test('calls onLocationClick when a location is selected', () => {
  const handleLocationClick = jest.fn();

  render(
    <InteractiveListView
      setView={() => {}}
      headquarters={mockHeadquarters}
      locations={mockLocations}
      selectedLocation={null}
      onLocationClick={handleLocationClick}
    />
  );

  const typeaheadElement = screen.getByLabelText('Choose a location...');

  fireEvent.change(typeaheadElement, { target: { value: 'Location 1' } });
  fireEvent.keyDown(typeaheadElement, { key: 'Enter' });

  expect(handleLocationClick).toHaveBeenCalledWith(mockLocations[0]);
});