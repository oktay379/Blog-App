import { useContext, useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "./App";

const Create = () => {
  const user = useContext(userContext);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("file", file);

    axios.post('http://localhost:3001/create ', formData)
    .then(res => {
      if(res.data === "Success") {
          navigate("/");
      }
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="post_container">
        <div className="post_form">
            <form onSubmit={handleSubmit}>
              <h3>Create Post</h3>
              <input type="text" placeholder="Enter Title" onChange={e => setTitle(e.target.value)}/>
              <textarea 
                name="desc" 
                id="desc" 
                cols="30" 
                rows="10"
                onChange={e => setDesc(e.target.value)}
              ></textarea>
              <input type="file" className="file" 
                placeholder="Select File" 
                onChange={e => setFile(e.target.files[0])} 
              />
              <button>Post</button>
            </form>
        </div>
    </div>
  )
}

export default Create