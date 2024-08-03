import PropTypes from 'prop-types';
const TopButtons = ({setQuery}) => {
    const cities = [
        { id: 1, name: 'Bangalore' },
        { id: 2, name: 'Patna' },
        { id: 3, name: 'Bokaro' },
        { id: 4, name: 'Kolkata' },
        { id: 5, name: 'San Francisco' },
      ];
  return (
    <div className="flex items-center justify-around my-6">
        {cities.map((city) => (
        <button
          key={city.id}
          className="text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in"
          onClick={() => setQuery({ q: city.name })}
        >
          {city.name}
        </button>
      ))}
    </div>
  )
}
TopButtons.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default TopButtons