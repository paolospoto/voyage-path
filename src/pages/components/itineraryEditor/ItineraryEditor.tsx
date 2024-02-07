import { useEffect, useState } from "react";
import { RequestType, geocode, setDefaults, OutputFormat } from "react-geocode";
import styles from "./index.module.scss";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Button, Flex } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

import Directions from "../directions";
import { Stop } from "@/utils/types";
import { createItem, readItem, updateItem } from "@/utils/storage";

import Modal from "../modal";

const ItineraryEditor = () => {
  const [startInput, setStartInput] = useState("");
  const [stopInputs, setStopInputs] = useState<string[]>([]);
  const [stops, setStops] = useState<Stop[]>([]);
  const [arrivalInput, setArrivalInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [startLat, setStartLat] = useState(0);
  const [startLng, setStartLng] = useState(0);
  const [renderForm, setRenderForm] = useState(true);
  const [renderModal, setRenderModal] = useState(false);

  const [renderMap, setRenderMap] = useState(false);
  const [renderDirections, setRenderDirections] = useState(false);

  const position = { lat: startLat, lng: startLng };

  const resetAll = () => {
    setStartInput("");
    setStopInputs([]);
    setStops([]);
    setArrivalInput("");
    setRenderForm(true);
    setRenderMap(false);
    setRenderDirections(false);
    setStartLat(0);
    setStartLng(0);
  };

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
      case "arrival":
        handleStopPoints();
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
  const handleArrivalInput = (e: any) => {
    setArrivalInput(e.target.value);
  };
  const handleNameChange = (e: any) => {
    setNameInput(e.target.value);
  };

  const handleStartingPoint = () => {
    geocode(RequestType.ADDRESS, startInput)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        setStartLat(lat);
        setStartLng(lng);
        setRenderMap(true);
      })
      .catch(console.error);
  };

  const handleStopInput = (index: any) => (e: any) => {
    const tempStops = [...stopInputs];
    tempStops[index] = e.target.value;
    setStopInputs(tempStops);
  };

  const addStopInput = () => {
    setStopInputs([...stopInputs, ""]);
  };
  const removeStopInput = (index: any) => {
    // Crea una copia dell'array per evitare di modificare lo stato direttamente
    const tempStops = [...stopInputs];
    // Rimuove 1 elemento all'indice specificato
    tempStops.splice(index, 1);
    // Aggiorna lo stato con il nuovo array
    setStopInputs(tempStops);
  };

  const handleStopPoints = () => {
    const tempStops = stopInputs.map((stopInput) => ({
      location: stopInput,
      stopover: true,
    }));
    setStops(stops.concat(tempStops));
  };

  useEffect(() => {
    if (readItem("itineraries") === null) createItem("itineraries", []);
  }, []);

  const saveItinerary = (e: any) => {
    e.preventDefault();
    const tempItinerary = readItem("itineraries");
    tempItinerary.push({
      name: nameInput,
      time: Date.now(),
      start: startInput,
      stops: stops,
      arrival: arrivalInput,
    });
    updateItem("itineraries", tempItinerary);
    resetAll();
    setRenderModal(true);
    setTimeout(() => {
      setRenderModal(false);
    }, 2000);
  };
  return (
    <div style={{ width: "100%", height: "60vh", padding: "1.5rem" }}>
      {renderModal && <Modal />}
      {renderForm ? (
        <form className={styles.Form} onSubmit={handleSubmit}>
          <div className={styles.Input}>
            <input
              placeholder="Select starting point.."
              value={startInput}
              onChange={handleStartInput}
              disabled={startLat !== 0}
              required
            />
            {startLat === 0 && (
              <input type="submit" name="start" value="SET START" />
            )}

            {startLat !== 0 && (
              <Button onClick={addStopInput}>
                <IconPlus />
              </Button>
            )}
          </div>
          {startLat !== 0 && (
            <>
              {stopInputs.map((stop, index) => (
                <div key={index} className={styles.StopInput}>
                  <input
                    placeholder="Add stops if you want.."
                    value={stop}
                    onChange={handleStopInput(index)}
                    required
                  />
                  <Button onClick={() => removeStopInput(index)}>
                    <IconMinus />
                  </Button>
                </div>
              ))}

              <div className={styles.Input}>
                <input
                  placeholder="Select destination.."
                  value={arrivalInput}
                  onChange={handleArrivalInput}
                  required
                />
                <input type="submit" name="arrival" value="SET ARRIVAL" />
              </div>
            </>
          )}
        </form>
      ) : (
        <Flex gap={"sm"} p={"sm"}>
          <form className={styles.Form} onSubmit={saveItinerary}>
            <input
              type="text"
              placeholder="name"
              required
              onChange={handleNameChange}
            />
            <input type="submit" value="SAVE" />
          </form>
        </Flex>
      )}

      <APIProvider apiKey={"AIzaSyAziHvXBEgvKmVPbzZkcaTasDxOjWt1cwQ"}>
        {renderMap && (
          <Map
            mapId={"56522fd9aef04113"}
            zoomControl={false}
            streetViewControl={false}
            mapTypeControl={false}
            className={styles.Map}
            fullscreenControl={false}
            center={position}
            zoom={10}
            minZoom={2}
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
