type Props = {
  phaseId: string;
  width: number;
  height: number;
  className?: string;
};

export function RegionIllustration({ phaseId, width, height, className }: Props) {
  const url = `./illustrations/${phaseId}.svg`;
  return (
    <img
      src={url}
      alt=""
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={`block pointer-events-none select-none ${className ?? ""}`}
      style={{ width, height, objectFit: "contain" }}
    />
  );
}
