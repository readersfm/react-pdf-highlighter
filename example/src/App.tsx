import React, { useState } from "react";
import { IHighlight, PdfAnnotator } from "./react-pdf-highlighter";

const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";

function App() {
  const [highlights, setHighlights] = useState<Array<IHighlight>>([]);

  const handleNewHighlight = (highlight: IHighlight) => {
    setHighlights((h) => [...h, highlight]);
  };

  const deleteHighlight = (id: string) => {
    const filter = highlights.filter((v) => v.id != id);
    setHighlights(filter);
  };

  const updateHighlight = (highlightId: string, comment: any) => {
    let newHighlights = highlights.map((v) => {
      if (v.id == highlightId) {
        v.comment = comment;
      }
      return v;
    });

    setHighlights(newHighlights);
  };

  const [zoom, setZoom] = useState<string | number>("auto");

  const handlePDFZoomIn = () => {
    let currentScale = (window as any).PdfViewer.viewer.currentScale;
    setZoom((s) =>
      typeof s == "string" ? currentScale + 0.025 : Math.min(s + 0.025, 6)
    );
    console.log(currentScale);
  };
  const handlePDFZoomOut = () => {
    let currentScale = (window as any).PdfViewer.viewer.currentScale;
    setZoom((s) =>
      typeof s == "string" ? currentScale - 0.025 : Math.max(s - 0.025, 0.025)
    );
    console.log(currentScale);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div onClick={() => handlePDFZoomIn()}>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 0L15.9991 0.00300096L13.3939 0C14.8327 0 15.9991 1.17545 15.9991 2.62541V21.3709C15.9991 22.8209 14.8327 23.9964 13.3939 23.9964L13.7669 24L13.766 23.9962L2.60524 23.9964C1.16642 23.9964 0 22.821 0 21.371V2.62541C0 1.17543 1.16642 0 2.60524 0H16ZM13.7669 2.25035H2.60524C2.39969 2.25035 2.23306 2.41827 2.23306 2.62541V21.371C2.23306 21.5782 2.39969 21.746 2.60524 21.746H13.7669V2.25035Z"
            fill="#212121"
          />
        </svg>
      </div>
      <div onClick={() => handlePDFZoomOut()}>
        <svg
          width="30"
          height="24"
          viewBox="0 0 30 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.1253 0L16.1244 0.00300096L27.3744 0.00364551C28.8245 0.00364551 30 1.17909 30 2.62905V21.3746C30 22.8246 28.8245 24 27.3744 24H13.8747L13.8738 23.9962L2.62563 23.9964C1.17555 23.9964 0 22.821 0 21.371V2.62541C0 1.17543 1.17555 0 2.62563 0H16.1253ZM27.3744 2.25399H16.1253V21.7497H27.3744C27.5814 21.7497 27.7495 21.5818 27.7495 21.3746V2.62905C27.7495 2.42192 27.5814 2.25399 27.3744 2.25399ZM13.8747 2.25035H2.62563C2.41848 2.25035 2.25054 2.41827 2.25054 2.62541V21.371C2.25054 21.5782 2.41848 21.746 2.62563 21.746H13.8747V2.25035Z"
            fill="#212121"
          />
        </svg>
      </div>
      <PdfAnnotator
        onNewHightlight={handleNewHighlight}
        pdfSrc={PRIMARY_PDF_URL}
        highlights={highlights}
        onDeleteHighlight={deleteHighlight}
        onUpdateHighlight={updateHighlight}
        isDualPageArrow
        pdfScaleValue={zoom.toString()}
      />
    </div>
  );
}

export default App;
