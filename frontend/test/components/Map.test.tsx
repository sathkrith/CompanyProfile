import React from 'react';
import { render, screen } from '@testing-library/react';
import Map from '../../src/components/Map';

test('renders map container', () => {
  const setView = jest.fn();
  const locations = [
    {
      location_id: 1,
      company_id: 1,
      name: 'Location 1',
      address: '123 Main St',
      latitude: 1,
      longitude: 1,
    },
    {
      location_id: 2,
      company_id: 2,
      name: 'Location 2',
      address: '456 Elm St',
      latitude: 2,
      longitude: 2,
    },
  ];
  const headquarters = {
    location_id: 3,
    company_id: 3,
    name: 'Headquarters',
    address: '789 Oak St',
    latitude: 3,
    longitude: 3,
  };
  const height = '500px';
  const width = '100%';

  render(
    <Map setView={setView} locations={locations} headquarters={headquarters} height={height} width={width} />
  );

  const mapContainer = screen.getByTestId('map-container');

  expect(mapContainer).toBeInTheDocument();
});

test('renders markers for locations', () => {
  const setView = jest.fn();
  const locations = [
    {
      location_id: '1',
      name: 'Location 1',
      address: '123 Main St',
      latitude: 1,
      longitude: 1,
    },
    {
      location_id: '2',
      name: 'Location 2',
      address: '456 Elm St',
      latitude: 2,
      longitude: 2,
    },
  ];
  const headquarters = {
    location_id: '3',
    name: 'Headquarters',
    address: '789 Oak St',
    latitude: 3,
    longitude: 3,
  };
  const height = '500px';
  const width = '100%';

  render(
    <Map setView={setView} locations={locations} headquarters={headquarters} height={height} width={width} />
  );

  const location1Marker = screen.getByTestId('marker-1');
  const location2Marker = screen.getByTestId('marker-2');

  expect(location1Marker).toBeInTheDocument();
  expect(location2Marker).toBeInTheDocument();
});

test('renders marker for headquarters', () => {
  const setView = jest.fn();
  const locations = [
    {
      location_id: '1',
      name: 'Location 1',
      address: '123 Main St',
      latitude: 1,
      longitude: 1,
    },
    {
      location_id: '2',
      name: 'Location 2',
      address: '456 Elm St',
      latitude: 2,
      longitude: 2,
    },
  ];
  const headquarters = {
    location_id: '3',
    name: 'Headquarters',
    address: '789 Oak St',
    latitude: 3,
    longitude: 3,
  };
  const height = '500px';
  const width = '100%';

  render(
    <Map setView={setView} locations={locations} headquarters={headquarters} height={height} width={width} />
  );

  const headquartersMarker = screen.getByTestId('marker-3');

  expect(headquartersMarker).toBeInTheDocument();
});