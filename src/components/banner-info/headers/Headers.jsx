import React from "react";
import { useAtom } from "jotai";
import { currentSceneAtom } from "../../../utils/GlobalState";
import BannerHeader from "./BannerHeader";
import BannerHeader2 from "./BannerHeader2";
import BannerHeader3 from "./BannerHeader3";

export default function Headers() {
    const [currentScene] = useAtom(currentSceneAtom);
  return (
    <div>
      {currentScene === 2 && <BannerHeader />}
      {currentScene === 3 && <BannerHeader2 />}
      {currentScene >= 4 && <BannerHeader3 />}
    </div>
  );
}
