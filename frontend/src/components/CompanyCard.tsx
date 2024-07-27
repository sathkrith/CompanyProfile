import React from 'react';
import { Company } from '../types';

interface CompanyCardProps {
    company:Company;
    onClick: () => void;
}

/**
 * Represents a card component displaying company information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Company} props.company - The company object containing name and address.
 * @param {Function} props.onClick - The function to be called when the card is clicked.
 * @returns {JSX.Element} The rendered CompanyCard component.
 */
const CompanyCard: React.FC<CompanyCardProps> = ({ company, onClick }) => {
    return (
        <div className="listcard w-full rounded overflow-hidden shadow-lg p-4 bg-white cursor-pointer" onClick={onClick}>
            <div className="font-bold text-xl mb-2">{company.name}</div>
            <p className="text-gray-700 text-base">{company.address}</p>
        </div>
    );
};

export default CompanyCard;
