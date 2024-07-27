import React from 'react';
import { FaMapMarkedAlt, FaList, FaThLarge } from 'react-icons/fa';

interface ViewMode {
    setView: (view: ViewEnum) => void;
}

/**
 * Represents the available view modes.
 */
export enum ViewEnum {
    Map = 'map',
    List = 'list',
    Tabbed = 'tabbed',
}

const ViewMode: React.FC<ViewMode> = ({setView}) => {
    return (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          <FaMapMarkedAlt size={30} onClick={() => setView(ViewEnum.Map)} className="cursor-pointer mx-2" />
          <FaList size={30} onClick={() => setView(ViewEnum.List)} className="cursor-pointer mx-2" />
          <FaThLarge size={30} onClick={() => setView(ViewEnum.Tabbed)} className="cursor-pointer mx-2" />
        </div>
    )
}
export default ViewMode;