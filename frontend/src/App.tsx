import { 
  BrowserRouter as Router,
  Route, 
  Routes
} from 'react-router-dom';
import LoginPage from './views/login';
import Home from './views/home';
import BgWrapper from './components/core/wrapper/bgWrapper';
import Register from './views/register';

function App() {
  return (
    <BgWrapper>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </Router>
    </BgWrapper>
  );
}

export default App;
