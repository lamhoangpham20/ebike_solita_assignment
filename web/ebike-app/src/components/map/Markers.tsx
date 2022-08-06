import React from "react";

export const Markers = (
  options: any,
  map: google.maps.Map,
  info: google.maps.InfoWindow
) => {
  const marker = new google.maps.Marker({
    position: options,
    map,
    title: "Hello World!",
    clickable: true,
  });
  marker.addListener("click", () => {
    info.close();
    info.setContent(marker.getTitle());
    info.open(marker.getMap(), marker);
  });
  return marker;
};
