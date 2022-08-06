import React, { useEffect, ReactElement, useLayoutEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Markers } from "./Markers";
import { api_key } from "../../../constant";

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
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
  children: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  let map: google.maps.Map;
  useLayoutEffect(() => {
    if (ref.current) {
      console.log(ref.current);
      map = new window.google.maps.Map(ref.current, { zoom, center });
    }
    const myLatLng = [
      { lat: -34.397, lng: 150.644 },
      { lat: -35.397, lng: 151.644 },
    ];
    const infoWindow = new google.maps.InfoWindow();
    myLatLng.map((i) => {
      Markers(i, map, infoWindow);
    });
  });
  // useEffect(() => {
  //   new window.google.maps.Map(ref.current, {});
  // });

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

export default function MapElements() {
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 9;

  return (
    <Wrapper apiKey={api_key} render={render}>
      <MyMapComponent center={center} zoom={zoom}>
        {/* <Marker position={position} /> */}
      </MyMapComponent>
    </Wrapper>
  );
}
