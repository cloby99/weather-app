import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import UilReact from '@iconscout/react-unicons/icons/uil-react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from "./services/weatherService"
import { useEffect, useState } from 'react';





function App(){

  const [query, setQuery] = useState({ q: "kandy" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.';
  
      toast.info('Fetching weather for ' + message);
  
      await getFormattedWeatherData({ ...query, units }).then(data => {
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)
        setWeather(data);
      });
    };
  
    fetchWeather();
  }, [query, units]);



  const formatBackground = () => {
      if (!weather) return "from-cyan-500 to-blue-600";
      const threshold = units === "metric" ? 25 : 60;
      if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";

      return "from-yellow-500 to-orange-300"

  };

  

  


  return(
    <div className='bg-black'>
      

      <div className={`container mx-auto max-w-screen-md my-0 pb-5 pt-2 px-32 bg-gradient-to-br max-h-fit shadow-xl shadow-gray-400  ${formatBackground()}`}>
            <TopButtons setQuery={setQuery}/>
            <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

          

            {weather && (
              <div>
                <TimeAndLocation weather={weather} />
                <TemperatureAndDetails weather={weather} />

                <Forecast title={'hourly forecast'} items={weather.hourly} />
                <Forecast title={'daily forecast'} items={weather.daily} />

              </div>
            )}

          <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} />

          </div>
    </div>

  )
}

export default App;
