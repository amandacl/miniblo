import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar"
import Foot from "./components/Foot"
import Register from "./pages/Register";
import Login from "./pages/Login";
import theme from './components/theme';
import { AuthProvider } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import {useState, useEffect} from 'react'
import { useAuthentication } from "./hooks/useAuthentication";
import '@fontsource/montserrat/400.css'
import CreatePost from "./pages/CreatePost";
import Dashboard from './pages/Dashboard'
import Search from "./pages/Search";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";


function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setUser(user)
    })
  },[auth])

  if(loadingUser){
    return <p>Carregando...</p>
  }


  return (
    <ChakraProvider theme={theme}>
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path ="/search" element={<Search/>}/>
            <Route path="/login" element={!user? <Login /> : <Navigate to="/"/>} />
            <Route path="/register" element={!user? <Register /> : <Navigate to="/"/>} />
            <Route path="/posts/create" element={user? <CreatePost /> : <Navigate to="/login"/>}/>
            <Route path="/dashboard" element={user? <Dashboard /> : <Navigate to="/login"/>}/>
            <Route path="/posts/edit/:id" element={user? <EditPost /> : <Navigate to="/login"/>}/>
            <Route path = "/posts/:id" element={<Post/>}/>
          </Routes>
          <Foot />
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
