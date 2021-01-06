import Tree from './components/tree/Tree';
import data from './mock.json';

function App() {
  return (
    <div className="App">
      <Tree data={data} />
    </div>
  );
}

export default App;
