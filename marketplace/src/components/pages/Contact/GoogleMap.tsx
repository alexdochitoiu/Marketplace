// @ts-nocheck
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const MapContainer = (props) => {
  return (
    <Map
      google={props.google}
      zoom={16}
      containerStyle={{
        height: 500,
        position: "relative",
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
      initialCenter={{ lat: 47.159446, lng: 27.585269 }}
    >
      <Marker position={{ lat: 47.159446, lng: 27.585269 }} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDNQIPldFqdwuHN9MN6RpVia1sYqUrVq54",
})(MapContainer);
