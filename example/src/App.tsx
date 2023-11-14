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

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <PdfAnnotator
        onNewHightlight={handleNewHighlight}
        pdfSrc={PRIMARY_PDF_URL}
        highlights={highlights}
        onDeleteHighlight={deleteHighlight}
        onUpdateHighlight={updateHighlight}
      />
    </div>
  );
}

export default App;
