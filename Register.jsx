import { Link, useNavigate} from "react-router-dom"
import "./style.css"
import { useState } from "react"
import axios from "axios"

const Register = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register', {username, email, password})
        .then(res => navigate("/login"))
        .catch(err => console.log(err))
    }

    return (
    <div className="signup_container">
        <div className="signup_form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Username:</label>
                    <input type="text" placeholder="Username"
                    onChange={e => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder="Email" 
                    onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" placeholder="Password"
                    onChange={e => setPassword(e.target.value)}/>
                </div>
                <button className="signup_btn" >Sign Up</button>
            </form>
            <br /><br />
            <p>Already have account</p>
            <Link to="/login" ><button>Login</button></Link>
        </div>
    </div>
    )
}

export default Register