import { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    
    const {id} = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put('http://localhost:3001/editpost/'+id, {title, desc})
        .then(res => {
            if(res.data === "Success") {
                navigate("/");
            }
        })
        .catch(err => console.log(err))
    };

    useEffect(() => {
        axios.get('http://localhost:3001/getpostbyid/' + id)
        .then(result => {
            setTitle(result.data.title);
            setDesc(result.data.desc);
        })
        .catch(err => console.log(err))
    }, []);

    return (
        <div className="post_container">
            <div className="post_form">
                <form onSubmit={handleSubmit}>
                <h3>Update Post</h3>
                <input type="text" 
                    placeholder="Enter Title" 
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                />
                <textarea 
                    name="desc" 
                    id="desc" 
                    cols="30" 
                    rows="10"
                    onChange={e => setDesc(e.target.value)}
                    value={desc}
                ></textarea>
                <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default EditPost