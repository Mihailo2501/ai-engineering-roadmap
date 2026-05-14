import { lazy, Suspense, useState } from "react";
import { CartographerMap } from "./components/cartographer-map";

const ScribesTentModal = lazy(() =>
  import("./components/scribes-tent-modal").then((m) => ({
    default: m.ScribesTentModal,
  }))
);
const VoyageLogDrawer = lazy(() =>
  import("./components/voyage-log").then((m) => ({ default: m.VoyageLogDrawer }))
);
const CinematicPlayer = lazy(() =>
  import("./components/cinematic-player").then((m) => ({
    default: m.CinematicPlayer,
  }))
);

export default function App() {
  const [scribesOpen, setScribesOpen] = useState(false);
  const [voyageOpen, setVoyageOpen] = useState(false);

  return (
    <div className="relative">
      <CartographerMap
        onOpenScribesTent={() => setScribesOpen(true)}
        onOpenVoyageLog={() => setVoyageOpen(true)}
      />
      <Suspense fallback={null}>
        <ScribesTentModal
          open={scribesOpen}
          onClose={() => setScribesOpen(false)}
        />
      </Suspense>
      <Suspense fallback={null}>
        <VoyageLogDrawer
          open={voyageOpen}
          onClose={() => setVoyageOpen(false)}
        />
      </Suspense>
      <Suspense fallback={null}>
        <CinematicPlayer />
      </Suspense>
    </div>
  );
}
