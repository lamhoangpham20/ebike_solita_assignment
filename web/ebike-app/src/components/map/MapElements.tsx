import React, { useEffect, ReactElement, useLayoutEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Markers } from "./Markers";
import { api_key } from "../../../constant/constant";
import { Station } from "../../types/station";

interface MapElementsProps {
  stations: Array<Station> | Station;
}

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <div>{status}</div>;
};

function MyMapComponent({
  center,
  zoom,
  children,
  stations,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
  children: any;
  stations: Array<Station> | Station;
}) {
  const ref = useRef<HTMLDivElement>(null);
  let map: google.maps.Map;
  useLayoutEffect(() => {
    if (ref.current) {
      map = new window.google.maps.Map(ref.current, { zoom, center });
    }
    const infoWindow = new google.maps.InfoWindow();
    if (Array.isArray(stations)) {
      stations.map((i) => {
        if (i.latitude && i.longitude && i.name) {
          Markers(
            {
              lat: parseFloat(Number(i.latitude).toFixed(5)),
              lng: parseFloat(Number(i.longitude).toFixed(5)),
            },
            i.name,
            map,
            infoWindow
          );
        }
      });
    } else {
      if (stations) {
        if (stations.latitude && stations.longitude && stations.name) {
          Markers(
            {
              lat: parseFloat(Number(stations.latitude).toFixed(3)),
              lng: parseFloat(Number(stations.longitude).toFixed(3)),
            },
            stations.name,
            map,
            infoWindow
          );
        }
      }
    }
  });

  return (
    <>
      <div ref={ref} id="map" style={{ height: "1000px", width: "50%" }} />
    </>
  );
}

const MapElements: React.FC<MapElementsProps> = (props: MapElementsProps) => {
  const { stations } = props;
  let center: { lat: number; lng: number } = { lat: 60.155, lng: 24.95 };
  if (Array.isArray(stations)) {
    if (stations[0]?.latitude && stations[0]?.longitude) {
      center = {
        lat: Number(stations[0]?.latitude),
        lng: Number(stations[0]?.longitude),
      };
      console.log(center);
    }
  } else {
    if (stations.latitude && stations.longitude) {
      console.log(stations);
      center = {
        lat: Number(stations.latitude),
        lng: Number(stations.longitude),
      };
    }
  }
  console.log(center);
  const zoom = 14;

  return (
    <Wrapper apiKey={api_key} render={render}>
      <MyMapComponent center={center} zoom={zoom} stations={stations}>
        {/* <Marker position={position} /> */}
      </MyMapComponent>
    </Wrapper>
  );
};

export default MapElements;
