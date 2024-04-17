import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useContext } from "react";
import { userContext } from "./App";
import axios from "axios";

const App = () => {
  const user = useContext(userContext);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    axios.get('http://localhost:3001/logout')
    .then(res => {
      if(res.data === "Success");
      navigate(0);
    }).catch(err => console.log(err))
  };

  return (
    <div className="navbar-header">
      <h3><Link className="link" to={"/"}>Blog App</Link></h3>
      <div>
        <Link to="/" className="link">Home</Link>
        {
          user.username ? 
          <Link to="/create" className="link">Create</Link>
          : ""
        }
        <a href="" className="link">Contact</a>
      </div>
      {
        user.username ? 
        <div onClick={handleLogout}>
          <input type="button" className="btn_input" value="Logout" /> 
          <span style={{marginLeft:"15px"}}>{user.username}</span> 
        </div> :
        <div><Link to="/register" className="link">Login/Register</Link></div>
      }
    </div>
  )
}

export default App