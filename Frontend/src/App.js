import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/AboutUs';
import Contact from './Pages/ContactUs';
import Cart from './Pages/Cart';
import RegistrationForm from './Pages/RegisterForm';
import LoginForm from './Pages/LoginForm';

function App() {
  return (
    <Router>

<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/about' element={<About/>}/>
<Route path='/contact' element={<Contact/>}/>
<Route path='/cart' element={<Cart/>}/>
<Route path='/register' element={<RegistrationForm/>}/>
<Route path='/login' element={<LoginForm/>}/>

</Routes>
    </Router>
  );
}

export default App;
