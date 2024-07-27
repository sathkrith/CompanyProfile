import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CompanyLocation } from '../types';
import ViewMode, { ViewEnum } from './ViewMode';


interface MapViewProps {
  setView: (view: ViewEnum) => void;
  locations: CompanyLocation[];
  height: string;
  width: string;
  headquarters?: CompanyLocation | null;
}

export const greenIcon = new L.Icon({
    iconUrl: require('../common/static/icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

/**
 * Default icon for Leaflet map markers.
 */
export const defaultIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const Map: React.FC<MapViewProps> = ({ setView, locations, headquarters, height, width }) => {
    const primaryLocation = headquarters? headquarters:locations[0];
    const centerX = primaryLocation? primaryLocation.latitude:0;
    const centerY = primaryLocation? primaryLocation.longitude:0;
  return (
    <div className="relative flex justify-center h-screen">
        <div className="flex justify-center z-10 ">
            <ViewMode setView={setView} />
        </div>
        <div className="flex h-full w-full z-1">
            <MapContainer center={[centerX, centerY]} zoom={2} style={{ height: height, width: width }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {
                headquarters &&
                <Marker position={[headquarters.latitude, headquarters.longitude]} icon={greenIcon}>
                    <Popup>
                    {headquarters.name}<br />{headquarters.address}
                    </Popup>
                </Marker>
                }
            {locations.map(location => (
                <Marker key={location.location_id} position={[location.latitude, location.longitude]} icon={defaultIcon}> 
                <Popup>
                {location.name}<br />{location.address}
                </Popup>
            </Marker>))
            }
            </MapContainer>
        </div>
    </div>
  );
};

export default Map;
