import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../assets/css/App.css';
import Home from '../pages/Home';
import Session from '../pages/Session';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/Session' element={<Session />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
