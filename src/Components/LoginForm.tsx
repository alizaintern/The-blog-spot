import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "constants/routes";
import Record from "interfaces/record";
import { initialForm } from "constants/intialForm";
import { Post } from "interfaces/post";

interface LoginFormProps {
  records: Record[];
 
}

const LoginForm: React.FC<LoginFormProps> = ({ records}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    const loggedInUser = records.find(
      (record) =>
        record.username === formData.username &&
        record.password === formData.password
    );

    if (loggedInUser) {
      console.log("user id with :" + loggedInUser.id + "is logged in ");
      
      navigate(ROUTES.Feed, {
        state: { id: loggedInUser.id, name: loggedInUser.username },
      });
    } else {
      
      alert("Invalid username or password");
    }
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>Username</label>
        <br></br>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password</label>
        <br></br>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button className="signin-btn" type="submit" onChange={handleLogin}>
        Login
      </button>
      <button className="signup-btn" onClick={() => navigate(ROUTES.root)}>
        Sign Up
      </button>
    </form>
  );
};

export default LoginForm;
