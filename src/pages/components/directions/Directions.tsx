import { Flex } from "@mantine/core";
import {
  IconArrowRight,
  IconHomeMove,
  IconPointFilled,
} from "@tabler/icons-react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

import styles from "./index.module.scss";

const Directions = ({ start, stops, arrival }: any) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [route, setRoute] = useState<any>();

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({
        map,
      })
    );
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionRenderer) return;

    directionsService
      .route({
        origin: start,
        waypoints: stops,
        destination: arrival,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        console.log(response);

        setRoute(response.routes[0]);

        directionRenderer.setDirections(response);
      })
      .catch((error) => {
        alert("That's a bit too far, try adding more stops! ");
      });
  }, [directionsService, directionRenderer, start, stops, arrival]);

  return (
    <>
      {route && (
        <Flex
          className={styles.Summary}
          justify={"center"}
          align={"center"}
          direction={"row"}
          gap={"xs"}
        >
          <>
            <IconHomeMove /> <p> From {start.split(",")[0].toUpperCase()} </p>
            {stops.length !== 0 && (
              <>
                <IconArrowRight />
                {stops.length === 1 ? (
                  <p>Through {stops.length} stop</p>
                ) : (
                  <p>Through {stops.length} stops</p>
                )}
              </>
            )}
            <IconPointFilled />
            <p> To {arrival.split(",")[0].toUpperCase()} </p>
          </>
        </Flex>
      )}
    </>
  );
};
export default Directions;
