import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';

import {useState, useEffect} from  'react';
import { useAuthentication } from './Hooks/useAuthentication';

import { AuthProvider } from './Components/Context/AuthContext';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

import Home from './Pages/Home';
import About from './Pages/About';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CreatePost from './Pages/CreatePost';
import Dashboard from './Pages/Dashboard';
import Search from './Pages/Search';
import Post from './Pages/Post';
import EditPost from './Pages/EditPost';

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser  = user === undefined

  useEffect(()=> {
    onAuthStateChanged(auth, (user)=> {
      setUser(user)
    })
  }, [auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
    <AuthProvider value={{user}}>  
     <BrowserRouter>
     <Navbar/>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/search' element={<Search/>} />
            <Route path='/posts/:id' element={< Post/>} />
            <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>} />
            <Route path='/register' element={!user ? <Register/> : <Navigate to="/"/>} />
            <Route path="posts/edit/:id" element={user ? <EditPost/> : <Navigate to="login"/>} />
            <Route path='/posts/create' element={user ? <CreatePost/> : <Navigate to="/login"/>} />
            <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to="/login"/>} />
          </Routes>
        </div>
        <Footer/>
     </BrowserRouter>
     </AuthProvider>
    </div>
  );
}

export default App;
