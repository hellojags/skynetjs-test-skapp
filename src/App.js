import './App.css';
import {MySky } from "./components/mysky/MySky";
import { SkynetProvider} from "./context";
import Home from "./home"
import { UseWebSocketTester } from './components/WebsocketTester';

function App() {
  return (
    <SkynetProvider>
    <div className="App">
      <Home/>
      <UseWebSocketTester/>
    </div>
    </SkynetProvider>
  );
}
export default App;
