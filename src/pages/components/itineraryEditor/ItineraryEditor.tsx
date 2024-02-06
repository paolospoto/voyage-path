import { useEffect, useState } from "react";
import { RequestType, geocode, setDefaults, OutputFormat } from "react-geocode";
import styles from "./index.module.scss";
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Button, Flex } from "@mantine/core";
import {
  IconArrowRight,
  IconMinus,
  IconPlus,
  IconPointFilled,
  IconX,
} from "@tabler/icons-react";

import { IconHomeMove } from "@tabler/icons-react";
import Directions from "../directions";

const ItineraryEditor = () => {
  const [startInput, setStartInput] = useState("");
  const [stopInput, setStopInput] = useState("");
  const [stops, setStops] = useState<Stop[]>([]);
  const [arrivalInput, setArrivalInput] = useState("");
  const [startLat, setStartLat] = useState(0);
  const [startLng, setStartLng] = useState(0);
  const [renderForm, setRenderForm] = useState(true);
  const [renderStopForm, setRenderStopForm] = useState(false);
  const [renderMap, setRenderMap] = useState(false);
  const [renderDirections, setRenderDirections] = useState(false);

  const position = { lat: startLat, lng: startLng };

  setDefaults({
    key: "AIzaSyAziHvXBEgvKmVPbzZkcaTasDxOjWt1cwQ",
    language: "en",
    region: "es",
    outputFormat: OutputFormat.JSON,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const submitButtonName = e.nativeEvent.submitter.name;

    switch (submitButtonName) {
      case "start":
        handleStartingPoint();

        break;
      case "stop":
        handleStopPoint();
        setStopInput("");
        break;
      case "arrival":
        console.log(stops);

        setRenderDirections(true);
        setRenderForm(false);
        break;
      default:
        console.log("Azione non riconosciuta");
    }
  };

  const handleStartInput = (e: any) => {
    setStartInput(e.target.value);
  };
  const handleArrivalChange = (e: any) => {
    setArrivalInput(e.target.value);
  };

  const handleStartingPoint = () => {
    geocode(RequestType.ADDRESS, startInput)
      .then(({ results }) => {
        console.log(results[0].geometry.location);
        const { lat, lng } = results[0].geometry.location;
        setStartLat(lat);
        setStartLng(lng);
        setRenderMap(true);
      })
      .catch(console.error);
  };

  const handleStopInput = (e: any) => {
    setStopInput(e.target.value);
  };

  const handleStopPoint = () => {
    const tempStops = [...stops];
    tempStops.push({ location: stopInput, stopover: true });
    setStops(tempStops);
    setStopInput("");
  };

  return (
    <div style={{ width: "100%", height: "60vh", padding: "1rem" }}>
      {renderForm ? (
        <form className={styles.Form} onSubmit={handleSubmit}>
          <div className={styles.Input}>
            <input
              placeholder="Select starting point.."
              value={startInput}
              onChange={handleStartInput}
            />
            <input type="submit" name="start" value="SET START" />
            <Button
              onClick={() =>
                renderStopForm
                  ? setRenderStopForm(false)
                  : setRenderStopForm(true)
              }
            >
              {renderStopForm ? <IconMinus /> : <IconPlus />}
            </Button>
          </div>
          {renderStopForm && (
            <div className={styles.StopInput}>
              <input
                placeholder="Add stops if you want.."
                value={stopInput}
                onChange={handleStopInput}
              />
              <input type="submit" name="stop" value="ADD STOP" />
            </div>
          )}
          <div className={styles.Input}>
            <input
              placeholder="Select destination.."
              value={arrivalInput}
              onChange={handleArrivalChange}
            />
            <input type="submit" name="arrival" value="SET DESTINATION" />
          </div>
        </form>
      ) : (
        <Flex gap={"sm"}>
          <Button>SAVE ITINERARY</Button>
          <Button>
            <IconX />
          </Button>
        </Flex>
      )}

      <APIProvider apiKey={"AIzaSyAziHvXBEgvKmVPbzZkcaTasDxOjWt1cwQ"}>
        {renderMap && (
          <Map
            zoomControl={false}
            streetViewControl={false}
            mapTypeControl={false}
            className={styles.Map}
            fullscreenControl={false}
            center={position}
            zoom={10}
          >
            <Marker position={position} />
            {renderDirections && (
              <Directions
                start={startInput}
                stops={stops}
                arrival={arrivalInput}
              />
            )}
          </Map>
        )}
      </APIProvider>
    </div>
  );
};

export default ItineraryEditor;
