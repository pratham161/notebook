import {useState} from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"", password:""});

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const url = 'http://localhost:4000/api/auth/login'
        const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email:credentials.email, password:credentials.password})
    });
      
    const json = await response.json()
    // console.log(json);
    if(json.success){
      //save the auth token and redirect
      localStorage.setItem('token',json.authToken);
      navigate("/");
    }else{
      alert(json.error)
    }
    }

    const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]:e.target.value});
    }

  return (
    <div className="my-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={onChange}
            type="email"
            name="email"
            value={credentials.email}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            type="password"
            name="password"
            value={credentials.password}
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
