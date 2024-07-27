/**
 * A component that displays a list of locations with an interactive map.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {CompanyLocation} props.headquarters - The headquarters location.
 * @param {CompanyLocation[]} props.locations - The list of locations.
 * @param {CompanyLocation|null} props.selectedLocation - The currently selected location.
 * @param {Function} props.onLocationClick - The function to handle location click events.
 * @returns {JSX.Element} The rendered component.
 */
import React, { useState } from 'react';
import Map from './Map';
import { CompanyLocation } from '../types';
import { Typeahead } from 'react-bootstrap-typeahead';
import { ViewEnum } from './ViewMode';

interface ListViewWithMapProps {
  setView: (view: ViewEnum) => void;
  headquarters?: CompanyLocation;
  locations: CompanyLocation[];
  selectedLocation: CompanyLocation| null ;
  onLocationClick: (location: CompanyLocation) => void;
}

const InteractiveListView: React.FC<ListViewWithMapProps> = ({ setView, headquarters, locations }) => {
  const combinedList = [{ ...headquarters, ix: 0 }].concat(locations.map((location, ix) => ({ ...location, ix: ix + 1 })));
  const [selectedLocation, setSelectedLocation] = useState<CompanyLocation[]>([]);
  return (
    <div className="h-full w-full">
      <div style={{paddingBottom:"5px"}} >
        <Typeahead
          id="location-typeahead"
          labelKey="name"
          options={combinedList}
          placeholder="Choose a location..."
          onChange={(selectedOption) => {
            if (selectedOption) {
              setSelectedLocation(selectedOption as CompanyLocation[]);
            }
          }}
          selected={selectedLocation}
          multiple={false}  // Restrict to single selection
          clearButton  // Show a clear button
        />
      </div>
      <div style={{ flex: 2 }}>
        <Map
          setView={setView}
          locations={selectedLocation}
          height='100%'
          width="100%"
        />
      </div>
    </div>
  );
};

export default InteractiveListView;
