
import './App.css';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';

function App() {
  const tabData = [
    { label: "Stake" },
    { label: "UnStake" }
];
  return (
    <div >
      <Navbar/>
      <Home tabs={tabData}/>
      <Footer/>
    </div>
  );
}

export default App;
