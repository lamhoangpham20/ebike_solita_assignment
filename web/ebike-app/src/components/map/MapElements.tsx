import React, { useEffect, ReactElement, useLayoutEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Markers } from "./Markers";
import { api_key } from "../../../constant/constant";
import { Station } from "../../types/station";
import { isArray } from "util";

interface MapElementsProps {
  stations: Array<Station>;
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
      console.log(ref.current);
      map = new window.google.maps.Map(ref.current, { zoom, center });
    }
    const infoWindow = new google.maps.InfoWindow();
    if (Array.isArray(stations)) {
      stations.map((i) => {
        console.log(i.latitude);
      });
    } else {
      if (stations) {
        if (stations.latitude && stations.longitude && stations.name) {
          console.log(parseFloat(Number(stations.latitude).toFixed(3)));
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

// export const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
//   const [marker, setMarker] = React.useState<google.maps.Marker>();
//   console.log(1);
//   React.useEffect(() => {
//     if (!marker) {
//       setMarker(new google.maps.Marker());
//     }

//     // remove marker from map on unmount
//     return () => {
//       if (marker) {
//         marker.setMap(null);
//       }
//     };
//   }, [marker]);

//   React.useEffect(() => {
//     if (marker) {
//       marker.setOptions(options);
//     }
//   }, [marker, options]);

//   return <div></div>;
// };

const MapElements: React.FC<MapElementsProps> = (props: MapElementsProps) => {
  const { stations } = props;
  const center = { lat: 60.155, lng: 24.95 };
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
