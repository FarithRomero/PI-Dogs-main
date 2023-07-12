import Home from './views/home/home.component';
import DetailPage from './views/detailPage/detailPage.component';
import LandingPage from './views/landingPage/landing.component';
import CreateDog from './views/formPage/createDog.component';
import {Route, Routes} from "react-router-dom";
import './App.css';

function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<LandingPage/>}/> 
          <Route exact path="/home" element={<Home/>}/>
          <Route path="/home/:id" element={<DetailPage/>}/>  
          <Route path="/createDog" element={<CreateDog/>}/>
        </Routes>
      </div>

  );
}

export default App;
