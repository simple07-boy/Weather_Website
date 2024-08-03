import { useState, useEffect } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation"
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function capitalizeFirstLetter(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
  const [query, setQuery] = useState({ q: "kolkata" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  
  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching weather for ${capitalizeFirstLetter(cityName)}`);
    await getFormattedWeatherData({ ...query, units }).then((data) => {
      toast.success(`Successfully fetched weather for ${data.name}, ${data.country}.`);
      setWeather(data);
    });
  };

  useEffect(() => {
    getWeather();
  }, [query,units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  };

  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} setUnits={setUnits}/>
      {weather && (
        <>
          <TimeAndLocation weather={weather}/>
          <TemperatureAndDetails weather={weather} units={units}/>
          <Forecast title="3 hour forecast" data={weather.hourly} />
          <Forecast title="5 day forecast" data={weather.daily}/>
        </>
      )}
      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" newestOnTop={true} />
    </div>
  );
};
export default App;