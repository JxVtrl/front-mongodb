import React, { useEffect } from "react";
import { googleLoader } from "@/utils/google";
import { Rota } from "@/types";
import { getCoordsInGoogleMaps } from "@/utils/functions";

type SelectedMapProps = {
  route: Rota | null;
};

const SelectedMap: React.FC<SelectedMapProps> = ({ route }) => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  const initMap = async (
    origin: {
      lat: any;
      lng: any;
    },
    destination: {
      lat: any;
      lng: any;
    }
  ) => {
    if (!route) return console.log("route is null");
    if (
      !origin ||
      !destination ||
      !origin.lat ||
      !origin.lng ||
      !destination.lng ||
      !destination.lat
    ) {
      const newOrigin = await getCoordsInGoogleMaps(route.origin);
      const newDestination = await getCoordsInGoogleMaps(route.destination);

      origin = newOrigin;
      destination = newDestination;
    }

    const { Map } = await googleLoader.importLibrary("maps");

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    if (!mapRef.current) return console.log("mapRef.current is null");

    const map = new Map(mapRef.current, {
      center: origin,
      zoom: 8,
      disableDefaultUI: true,
    });

    directionsRenderer.setMap(map);

    const request = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result);
      }
    });

    const service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (!response) return console.log("error");

        if (status !== "OK") {
          alert("Error was: " + status);
        } else {
          const duration = response.rows[0].elements[0].duration?.text;
          const durationElement = document.getElementById("duration");

          if (durationElement) durationElement.innerHTML = duration || "";
        }
      }
    );
  };

  useEffect(() => {
    if (!route) return;
    initMap(route.origin_coords, route.destination_coords);
  }, [route]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        height: "100%",
        minHeight: "300px",
        maxHeight: "300px",
        margin: "24px auto",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      ref={mapRef}
    />
  );
};

export default SelectedMap;
