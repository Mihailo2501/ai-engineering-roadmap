import { useState } from "react";
import { CartographerMap } from "./components/cartographer-map";
import { ScribesTentModal } from "./components/scribes-tent-modal";
import { VoyageLogDrawer } from "./components/voyage-log";
import { CinematicPlayer } from "./components/cinematic-player";

export default function App() {
  const [scribesOpen, setScribesOpen] = useState(false);
  const [voyageOpen, setVoyageOpen] = useState(false);

  return (
    <div className="relative">
      <CartographerMap
        onOpenScribesTent={() => setScribesOpen(true)}
        onOpenVoyageLog={() => setVoyageOpen(true)}
      />
      <ScribesTentModal
        open={scribesOpen}
        onClose={() => setScribesOpen(false)}
      />
      <VoyageLogDrawer
        open={voyageOpen}
        onClose={() => setVoyageOpen(false)}
      />
      <CinematicPlayer />
    </div>
  );
}
