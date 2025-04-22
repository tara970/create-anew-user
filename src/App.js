import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './component/navbar';
import { Home } from './component/home';
import { Login } from './component/login';
import { Users } from './component/users';
import { User } from './component/user';
import { useState , createContext } from 'react';


export const AppContext = createContext();

function App() {

const [username,setUsername] = useState(()=>{
  const saveUser = JSON.parse(localStorage.getItem('userDetails'));
  return saveUser ? saveUser.first_name : '';
});
const [userDetails,setUserDetails] = useState(()=>{
    return JSON.parse(localStorage.getItem('userDetails')) || null;
}); // برای کاربری که لاگین کرده

  return (
    <div className="App">
     <AppContext.Provider value={{username , setUsername , userDetails , setUserDetails}}>
     <Router>
      <Navbar/>
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/users' element={<Users/>}/>
         <Route path='/user/:id' element={<User/>}/>
       </Routes>
     </Router> 
     </AppContext.Provider>
    </div>
  );
}

export default App;
