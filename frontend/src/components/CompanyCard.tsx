import React from 'react';
import { Company } from '../types';

interface CompanyCardProps {
    company:Company;
    onClick: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onClick }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-2 cursor-pointer card" onClick={onClick}>
      <div className="font-bold text-xl mb-2">{company.name}</div>
      <p className="text-gray-700 text-base">{company.address}</p>
    </div>
  );
};

export default CompanyCard;
