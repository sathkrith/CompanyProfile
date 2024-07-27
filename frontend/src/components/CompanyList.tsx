import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Company } from '../types';
import CompanyCard from './CompanyCard';

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    axios.get(`/api/companies`)
      .then(response => setCompanies(response.data.companies))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );
  const history = useNavigate ();
  const handleCardClick = (id: number) => {
    history(`/company/${id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="p-4 h-full w-full">
      <h1 className="text-2xl font-bold mb-4">Companies</h1>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Search companies..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCompanies.length !== 0 && (
          filteredCompanies.map(company => (
          <CompanyCard
            key={company.company_id}
            company={company}
            onClick={() => handleCardClick(company.company_id)}
          />
        )))}
        {filteredCompanies.length === 0 && <strong>No companies found</strong>}
      </div>
    </div>
  );
}

export default CompanyList;
