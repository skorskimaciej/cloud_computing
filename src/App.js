import Reac, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import logo from './logo.svg';
import './App.css';
import { API } from 'aws-amplify'
import sensorsData from './data/sensors-sites.json'

function App() {
  const [greeting, setGreeting] = useState(null)
  async function fetchGreeting() {
    const apiData = await API.get('mypythonapi', '/greeting')
    setGreeting(apiData.message)
  }
  useEffect(() => {
    fetchGreeting()
  }, [])

  return (
  <div>
    <MapContainer center={[50.059106997318814, 19.939542111356396]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sensorsData.map(sns => (
          <Marker
          key = {sns.id}
          position={[sns.cords.Latitude, sns.cords.Longitude]}>
          <Popup>
            <h2>Sensor {sns.sensorID}</h2> <br /> PM10: {sns.PM10} <br /> Temp: {sns.temperature} <br /> Humidity: {sns.humidity}
          </Popup>
          </Marker>
        ))}
    </MapContainer>

    {sensorsData.map(sns => (
    <h4>
          <h2>Sensor {sns.sensorID}</h2>
          <h4>PM10: {sns.PM10}</h4>
          <h4>Temp: {sns.temperature}</h4>
          <h4>Humidity: {sns.humidity}</h4>
    </h4>
        ))}




    </div>
  );
}

export default App;
