import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PageShell from "./components/pageShell";
import { readItem } from "@/utils/storage";
import Directions from "./components/directions";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const ItineraryInfo = () => {
  const [itineraryData, setItineraryData] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const itineraryIndex = router.query.itinerary as string;

    const itineraries = readItem("itineraries");
    const itinerary = itineraries[itineraryIndex];

    console.log("itin:", itinerary);

    setItineraryData(itinerary);
  }, []);

  return (
    <PageShell pt={80}>
      <APIProvider apiKey="AIzaSyAziHvXBEgvKmVPbzZkcaTasDxOjWt1cwQ">
        <h1>fra</h1>
        {itineraryData && (
          <div style={{ height: "50vh" }}>
            <Map
              mapId={"56522fd9aef04113"}
              zoomControl={false}
              streetViewControl={false}
              mapTypeControl={false}
              fullscreenControl={false}
              zoom={10}
            >
              <Directions
                start={itineraryData.start}
                stops={itineraryData.stops}
                arrival={itineraryData.arrival}
              />
            </Map>
          </div>
        )}
      </APIProvider>
    </PageShell>
  );
};

export default ItineraryInfo;
