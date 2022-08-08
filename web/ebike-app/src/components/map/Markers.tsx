import React from "react";

export const Markers = (
  options: any,
  name:string,
  map: google.maps.Map,
  info: google.maps.InfoWindow
) => {
  const marker = new google.maps.Marker({
    position: options,
    map,
    title: name,
    clickable: true,
  });
  marker.addListener("click", () => {
    info.close();
    info.setContent(marker.getTitle());
    info.open(marker.getMap(), marker);
  });
  return marker;
};
