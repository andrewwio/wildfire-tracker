import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationInfoBox from './LocationInfoBox';
import LocationMarker from './LocationMarker'

const NATURAL_EVENT_WILDFIRE = 'wildfires';

const Map = ({ eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null)

  const markers = eventData.map((ev) => {
    if(ev.categories[0].id === NATURAL_EVENT_WILDFIRE) {
        return <LocationMarker 
        lat={ev.geometry[0].coordinates[1]} 
        lng={ev.geometry[0].coordinates[0]} 
        onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
        />
    }
    return null
})
  

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
        defaultCenter={ center }
        defaultZoom={ zoom }
      >
        {markers}
      </GoogleMapReact>
      {locationInfo ? <LocationInfoBox info={locationInfo} /> : null}
    </div>
  )
}

Map.defaultProps = {
  center: { 
    lat: 42.3265,
    lng: -122.8756
  },
  zoom: 6
}

export default Map