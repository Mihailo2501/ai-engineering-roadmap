export type RegionPlacement = {
  phaseId: string;
  cx: number;
  cy: number;
  illustrationWidth: number;
  illustrationHeight: number;
  bannerOffsetY: number;
  checkpointOffsets: { x: number; y: number }[];
};

export const MAP_WIDTH = 2880;
export const MAP_HEIGHT = 1280;

export const regions: RegionPlacement[] = [
  {
    phaseId: "home-port",
    cx: 250,
    cy: 920,
    illustrationWidth: 300,
    illustrationHeight: 220,
    bannerOffsetY: -150,
    checkpointOffsets: [
      { x: -110, y: 170 },
      { x: -30, y: 200 },
      { x: 60, y: 200 },
      { x: 150, y: 200 },
      { x: 240, y: 170 },
    ],
  },
  {
    phaseId: "the-library",
    cx: 670,
    cy: 580,
    illustrationWidth: 320,
    illustrationHeight: 230,
    bannerOffsetY: -160,
    checkpointOffsets: [
      { x: -150, y: 165 },
      { x: -55, y: 175 },
      { x: 40, y: 185 },
      { x: 140, y: 175 },
      { x: 230, y: 165 },
      { x: -150, y: 245 },
      { x: 0, y: 260 },
      { x: 175, y: 250 },
    ],
  },
  {
    phaseId: "harbor-of-protocols",
    cx: 1080,
    cy: 870,
    illustrationWidth: 320,
    illustrationHeight: 230,
    bannerOffsetY: -155,
    checkpointOffsets: [
      { x: -160, y: 165 },
      { x: -60, y: 180 },
      { x: 40, y: 190 },
      { x: 145, y: 180 },
      { x: 245, y: 165 },
      { x: -100, y: 250 },
      { x: 60, y: 260 },
      { x: 200, y: 245 },
    ],
  },
  {
    phaseId: "the-workshop",
    cx: 1500,
    cy: 540,
    illustrationWidth: 320,
    illustrationHeight: 230,
    bannerOffsetY: -160,
    checkpointOffsets: [
      { x: -160, y: 160 },
      { x: -55, y: 175 },
      { x: 50, y: 185 },
      { x: 155, y: 175 },
      { x: 250, y: 165 },
      { x: -110, y: 245 },
      { x: 60, y: 255 },
      { x: 215, y: 240 },
    ],
  },
  {
    phaseId: "framework-crossroads",
    cx: 1920,
    cy: 720,
    illustrationWidth: 320,
    illustrationHeight: 220,
    bannerOffsetY: -150,
    checkpointOffsets: [
      { x: -140, y: 165 },
      { x: -30, y: 185 },
      { x: 90, y: 195 },
      { x: 200, y: 180 },
      { x: 45, y: 250 },
    ],
  },
  {
    phaseId: "the-observatory",
    cx: 2320,
    cy: 420,
    illustrationWidth: 320,
    illustrationHeight: 230,
    bannerOffsetY: -155,
    checkpointOffsets: [
      { x: -160, y: 160 },
      { x: -55, y: 175 },
      { x: 50, y: 185 },
      { x: 155, y: 170 },
      { x: 250, y: 160 },
      { x: -80, y: 245 },
      { x: 130, y: 245 },
    ],
  },
  {
    phaseId: "the-summit",
    cx: 2680,
    cy: 230,
    illustrationWidth: 300,
    illustrationHeight: 240,
    bannerOffsetY: -160,
    checkpointOffsets: [
      { x: -150, y: 165 },
      { x: -55, y: 180 },
      { x: 45, y: 195 },
      { x: 145, y: 180 },
      { x: 235, y: 165 },
      { x: -90, y: 250 },
      { x: 30, y: 260 },
      { x: 165, y: 250 },
      { x: 270, y: 100 },
    ],
  },
];

export const scribesTent = { x: 480, y: 990 };

export function regionFor(phaseId: string): RegionPlacement | undefined {
  return regions.find((r) => r.phaseId === phaseId);
}
