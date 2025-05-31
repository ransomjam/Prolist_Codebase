import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Homepage />
      </div>
    </div>
  );
}

export default App;
