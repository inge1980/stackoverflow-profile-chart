import "./App.css";
import PieChart from "./components/pieChart";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Distribution of Stackoverflow contributions by a specific user
          <PieChart />
        </p>
      </header>
    </div>
  );
}

export default App;
