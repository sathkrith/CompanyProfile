/**
 * Renders a tabbed view component that displays a list of locations with a map for each location.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {CompanyLocation | null} props.headquarters - The headquarters location.
 * @param {CompanyLocation[]} props.locations - The list of additional locations.
 * @returns {JSX.Element} The rendered tabbed view component.
 */
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import MapView from './Map';
import { CompanyLocation } from '../types';
import { ViewEnum } from './ViewMode';


interface TabbedViewProps {
    setView: (view: ViewEnum) => void;
  headquarters: CompanyLocation | null;
  locations: CompanyLocation[];
}

const TabbedView: React.FC<TabbedViewProps> = ({ setView, headquarters, locations }) => {
    const combinedList = [headquarters].concat(locations);
    const handleSelect = (key: string|null) => {
        // Trigger a resize event to fix map rendering issues
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 100);
      };
    if (!combinedList[0]) return null;
  return (
    <Tabs defaultActiveKey={combinedList[0].location_id} id="location-tabs" className="mb-3" onSelect={handleSelect}>
      {combinedList.map(location => (
        !location ? null : (
          <Tab eventKey={location.location_id} title={location.name} key={location.location_id} >
            <div className="h-full">
            <MapView  setView={setView} locations={[location]} height='100%' width='100%'/>
            </div>
          </Tab>
        )
      ))}
    </Tabs>
  );
};

export default TabbedView;
