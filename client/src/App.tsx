import { useState } from "react";
import "./App.css";

import { ChartPage, HomePage } from "src/pages";

function App() {
  const [page, setPage] = useState<"home" | "chart">("home");

  return (
    <>
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "chart" && <ChartPage setPage={setPage} />}
    </>
  );
}

export default App;
