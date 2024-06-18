import { useState, useEffect } from "react";
import InOutManager from "./components/InOutManager";
import PiecesLister from "./components/PiecesLister";
import getCornerName from "./CRUDRequests/getCornerName";
import setCornerName from "./CRUDRequests/setCornerName";

function App() {
  const [cornerActualName, setActualCornerName] = useState<string>();

  useEffect(() => {
    let cornerName = getCornerName();
    if (!cornerName) {
      cornerName = window.prompt("Rentrez le nom de votre atelier / corner :");
      if (cornerName) {
        setCornerName(cornerName);
        setActualCornerName(cornerName);
      }
    }
    else setActualCornerName(cornerName);
  }, []);

  return (
    <div className="App">
      <header>
        <div id={"title"}>
          <img src="/icons/cr-logo.webp" alt="cr" width={92} height={92}/>
          <h1>Commandes ({cornerActualName})</h1>
        </div>
        <InOutManager />
      </header>
      <main>
        <PiecesLister />
      </main>
    </div>
  );
}

export default App;
