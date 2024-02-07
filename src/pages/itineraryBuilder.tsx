import PageShell from "./components/pageShell";

import ItineraryEditor from "./components/itineraryEditor";

const ItineraryBuilder = () => {
  return (
    <PageShell pt={80}>
      <ItineraryEditor />
    </PageShell>
  );
};

export default ItineraryBuilder;
