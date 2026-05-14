import { Composition } from "remotion";
import { IntroReel } from "./intro-reel";
import {
  PhaseCompletion,
  phaseCompletionDefaults,
} from "./phase-completion";
import { CapstoneReveal } from "./capstone-reveal";

export const RemotionRoot = () => (
  <>
    <Composition
      id="IntroReel"
      component={IntroReel}
      durationInFrames={360}
      fps={30}
      width={1280}
      height={720}
    />
    <Composition
      id="PhaseCompletion"
      component={PhaseCompletion}
      durationInFrames={180}
      fps={30}
      width={1280}
      height={720}
      defaultProps={phaseCompletionDefaults}
    />
    <Composition
      id="CapstoneReveal"
      component={CapstoneReveal}
      durationInFrames={900}
      fps={30}
      width={1280}
      height={720}
    />
  </>
);
