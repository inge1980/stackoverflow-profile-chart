import './App.css';
import PieChart from './components/pieChart';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
        Most used tags in real time from a specific StackOverflow user
        </p>
        <PieChart />
      </header>
    </div>
  );
}

export default App;
