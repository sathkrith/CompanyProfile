/**
 * Renders the details of a company, including its name, address, and locations.
 * Allows the user to navigate back to the company list and switch between different views.
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router';
import { FaMapMarkedAlt, FaList, FaThLarge } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from './Map';
import InteractiveListView from './InteractiveListView';
import TabbedView from './TabbedView';
import { Company, CompanyLocation } from '../types';
import { ViewEnum } from './ViewMode';
import CompanyDetailCard from './CompanyDetailCard';

const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [locations, setLocations] = useState<CompanyLocation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<CompanyLocation|null>(null);
  const [view, setView] = useState<ViewEnum>(ViewEnum.Map);
  const [filteredLocations, setFilteredLocations] = useState<CompanyLocation[]>([]);
  const [headQuarters, setHeadQuarters] = useState<CompanyLocation | null>(null);
  /**
   * Navigates back to the company list.
   */
  const history = useNavigate ();
  const goBack = () => {
    history('/'); 
  };
  useEffect(() => {
      axios.get(`/api/companies/${id}`)
      .then(response => {
        const comp = response.data.company as Company;
        setCompany(response.data.company);
        setError(null);
        axios.get(`/api/companies/${id}/locations`)
          .then(response => {
            const loc = response.data.locations as CompanyLocation[];
            setLocations(response.data.locations);
            setFilteredLocations(loc.filter(location =>
              location.latitude !== comp.latitude && location.longitude !== comp.longitude
            ));
            setHeadQuarters(loc.filter(location => location.latitude === comp.latitude && location.longitude === comp.longitude)[0]);
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              setError("Company locations not found");
              history('/NotFound');
            } else {
              setError("An error occurred while fetching company location details");
            }
          });
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setError("Company not found");
          history('/NotFound');
        } else {
          setError("An error occurred while fetching company details");
        }
      });
   }, [id]);


  
  // Handle the case where the company or locations are still loading
  if (error) return <div>{error}</div>;
  if (!company) return <div>Loading...</div>;
  if (!headQuarters) return <div>Loading...</div>;
  const handleLocationClick = (location: CompanyLocation|null) => {
    setSelectedLocation(location);
  };

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-bold">{company.name}</h1>
      <p className="mb-4">{company.address}</p>
      <button onClick={goBack} className="btn btn-primary mb-3">Back to List</button>
      <div className="flex-1 listblock">
        <h2 className="text-xl font-bold mb-2">Other Locations</h2>
        <div className="space-y-4">
          {filteredLocations.map(location => (
            <CompanyDetailCard key={location.location_id} location={location} />
          ))}
        </div>
      </div>
      <div className="relative flex flex-col md:flex-row h-full w-full">
        <div className="flex flex-col md:flex-row h-screen w-full">
            {view === ViewEnum.Map && (
              <div className="flex-1">
              <Map
                setView={setView}
                headquarters={headQuarters}
                locations={filteredLocations} 
                height={'100%'} 
                width={'100%'}        />
                </div>
            )}
            {view === ViewEnum.List && (
              <div className="flex flex-col md:flex-row h-full w-full">
              <InteractiveListView
                setView={setView}
                headquarters={headQuarters}
                locations={filteredLocations}
                selectedLocation={selectedLocation}
                onLocationClick={handleLocationClick}
              />
              </div>
            )}
            {view === ViewEnum.Tabbed && (
              <div className="flex-1  h-screen">
              <TabbedView
                setView={setView}
                headquarters={headQuarters}
                locations={filteredLocations}
              />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
