import React from 'react';

const MockLeaflet = ({ children }) => <div>{children}</div>;

export const MapContainer = MockLeaflet;
export const TileLayer = MockLeaflet;
export const Marker = MockLeaflet;
export const Popup = MockLeaflet;
export const useMap = jest.fn();
export const useMapEvent = jest.fn();
export const useMapEvents = jest.fn();
