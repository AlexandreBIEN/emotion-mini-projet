import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../assets/css/styles.css';
import Ajust from '../pages/Ajust';
import Home from '../pages/Home';
import Session from '../pages/Session';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/Session' element={<Session />}/>
        <Route path='/Ajust' element={<Ajust />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
