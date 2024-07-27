import React from 'react';
import { CompanyLocation } from '../types';

interface CompanyCardProps {
    location:CompanyLocation;
}

/**
 * Represents a card component displaying company information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {CompanyLocation} props.company - The company object containing name, address and co ordinates.
 * @returns {JSX.Element} The rendered CompanyCard component.
 */
const CompanyDetailCard: React.FC<CompanyCardProps> = ({ location }) => {
    return (
        <div className="detailcard w-full rounded shadow-lg p-4 bg-white flex justify-between items-center">
          <div>
            <div className="font-bold text-xl mb-2">{location.name}</div>
            <p className="text-gray-700 text-base">{location.address}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-700 text-sm">Latitude: {location.latitude}</p>
            <p className="text-gray-700 text-sm">Longitude: {location.longitude}</p>
          </div>
        </div>
      );
};

export default CompanyDetailCard;
