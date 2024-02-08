import { readItem, updateItem } from "@/utils/storage";
import { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Directions from "../directions";
import { Button, Flex } from "@mantine/core";
import { ItineraryData } from "@/utils/types";
import { formatTimestamp } from "@/utils/functions";
import { IconInfoCircle, IconMapCancel } from "@tabler/icons-react";

import styles from "./index.module.scss";
import Link from "next/link";

const ItinerariesList = () => {
  const [itineraries, setItineraries] = useState<ItineraryData[]>([]);
  useEffect(() => {
    const values = readItem("itineraries");
    console.log(values);

    if (values) {
      setItineraries(values);
    }
  }, []);

  const deleteSavedItineraries = (index: any) => {
    if (!confirm("Are you sure you want to delete this itinerary?")) return;

    const values = readItem("itineraries");
    values.splice(index, 1);
    updateItem("itineraries", values);
    setItineraries(values);
  };

  return (
    <Flex direction={"column"} align={"center"} justify={"center"} p={"md"}>
      {itineraries.length !== 0 ? (
        <APIProvider apiKey={"AIzaSyAziHvXBEgvKmVPbzZkcaTasDxOjWt1cwQ"}>
          {itineraries.map((itinerary, index) => (
            <Flex
              style={{ height: "80vh", width: "100%" }}
              key={index}
              direction={"column"}
              align={"center"}
              justify={"center"}
              pb={"xl"}
            >
              <Flex
                style={{ height: "8vh", width: "100%" }}
                justify={"space-between"}
                align={"center"}
              >
                <h3>{itinerary.name.toUpperCase()}</h3>
                <Flex justify={"center"} align={"center"} gap={"xs"}>
                  <p>{formatTimestamp(itinerary.time)}</p>
                  <Link
                    href={{
                      pathname: "/[itinerary]",
                      query: { itinerary: index },
                    }}
                  >
                    <Button>
                      <IconInfoCircle />
                    </Button>
                  </Link>
                  <Button onClick={() => deleteSavedItineraries(index)}>
                    <IconMapCancel />
                  </Button>
                </Flex>
              </Flex>
              <Map
                className={styles.Map}
                mapId={"56522fd9aef04113"}
                zoomControl={false}
                streetViewControl={false}
                mapTypeControl={false}
                fullscreenControl={false}
                zoom={10}
              >
                <Directions
                  start={itinerary.start}
                  stops={itinerary.stops}
                  arrival={itinerary.arrival}
                />
              </Map>
            </Flex>
          ))}
        </APIProvider>
      ) : (
        <>
          <h1>No itineraries saved</h1>
          <Link href={"/itineraryBuilder"}>
            <Button>CREATE NEW ITINERARY</Button>
          </Link>
        </>
      )}
    </Flex>
  );
};

export default ItinerariesList;
