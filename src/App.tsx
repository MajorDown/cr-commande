import InOutManager from "./components/InOutManager";
import PiecesLister from "./components/PiecesLister";

function App() {
  return (
    <div className="App">
      <header>
        <div id={"title"}>
          <img src="/icons/cr-logo.webp" alt="cr" width={92} height={92}/>
          <h1>Commandes</h1>
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
