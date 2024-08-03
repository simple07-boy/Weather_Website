import PropTypes from 'prop-types';
import { BiSearch, BiCurrentLocation } from "react-icons/bi";
import { toast } from 'react-toastify';
import { useState } from "react";
const Inputs = ({setQuery,setUnits}) => {
  const [city, setCity] = useState('');

  const handleSearchClick = () => {
    if (city !== '') setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching user's location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for cities..."
          className="text-gray-500 text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
        <BiSearch
          size={25}
          className="cursor-pointer transition ease-out hover:scale-125" onClick={handleSearchClick} 
        />
        <BiCurrentLocation
          size={25}
          className="cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick}
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits('metric')}
        >
          °C
        </button>
        <p className="text-2xl font-medium mx-1">|</p>
        <button
          name="imperial"
          className="text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits('imperial')}
        >
          °F
        </button>
      </div>
    </div>
  );
};
Inputs.propTypes = {
  setQuery: PropTypes.func.isRequired,
  setUnits: PropTypes.func.isRequired,
};

export default Inputs;
