import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:4000/api/auth/createuser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    // console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      // console.log(localStorage.getItem('token'));
      navigate("/");
    } else {
      alert(json.error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            onChange={onChange}
            className="form-control"
            name="name"
            value={credentials.name}
            id="name"
            aria-describedby="emailHelp"
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            onChange={onChange}
            name="email"
            value={credentials.email}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={onChange}
            name="password"
            value={credentials.password}
            className="form-control"
            id="password"
            required={true}
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
