import ItinerariesList from "./components/itinerariesList";
import PageShell from "./components/pageShell";

const MyItineraries = () => {
  return (
    <PageShell pt={80}>
      <ItinerariesList />
    </PageShell>
  );
};

export default MyItineraries;
