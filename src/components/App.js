import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../assets/css/styles.css';
import Ajust from '../pages/Ajust';
import Data from '../pages/Data';
import Home from '../pages/Home';
import Session from '../pages/Session';
import SessionEnd from '../pages/SessionEnd';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/ajust-webcam' element={<Ajust />}/>
        <Route path='/session' element={<Session />}/>
        <Route path='/session-end' element={<SessionEnd />}/>
        <Route path='/data' element={<Data />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
