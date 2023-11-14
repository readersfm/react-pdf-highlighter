import React from "react";
import App from "./App";
import "./index.css";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);

// pageMode?: PageMode;
// scrollMode?: ScrollMode;

// type PageMode = "single" | "dual";

// type ScrollMode = "vertical" | "horizontal";

// useEffect(() => {
//   const pageModeNum = getPageMode(pageMode);
//   const scrollModeNum = getScrollMode(scrollMode);

//   let viewer = (window as any).PdfViewer.viewer;
//   if (viewer) {
//     viewer.spreadMode = pageModeNum;
//     viewer.scrollMode = scrollModeNum;
//   }
// }, [pageMode, scrollMode]);

// const getPageMode = (key: PageMode) =>
//   rswitch(key, {
//     single: 0,
//     dual: 1,
//     "": 0,
//   });
// const getScrollMode = (key: ScrollMode) =>
//   rswitch(key, {
//     vertical: 0,
//     horizontal: 1,
//     "": 0,
//   });
