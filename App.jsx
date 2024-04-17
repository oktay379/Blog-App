import Navbar from "./Navbar";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Post from "./Post";
import EditPost from "./EditPost";
import Create from "./Create";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const userContext = createContext();


const App = () => {
  const [user, setUser] = useState({});

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:3001/")
    .then(user => {
      setUser(user.data)
      // console.log(user.data);
    })
    .catch(err => console.log(err))
  }, []);

  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home /> } />
            <Route path="/register" element={<Register /> } />
            <Route path="/login" element={<Login /> } />
            <Route path="/create" element={<Create /> } />
            <Route path="/post/:id" element={<Post /> } />
            <Route path="/editpost/:id" element={<EditPost /> } />
          </Routes>
      </BrowserRouter>
    </userContext.Provider>
  )
}

export default App