import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";



export type LottieSponsorIconProps = {
  fileName: string; // e.g. "gold-house-corn.json"
  className?: string;
};

export default function LottieSponsorIcon({ fileName, className }: LottieSponsorIconProps) {
  return (
    <div className={className} aria-hidden="true">
      <DotLottieReact

        src={`/assets/lottie-icons/${fileName}`}
        autoplay
        loop
      />
    </div>
  );
}

