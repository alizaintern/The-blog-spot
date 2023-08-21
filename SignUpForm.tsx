import React, { useState} from "react";
import { useNavigate } from "react-router-dom";



interface Record {
  id: any;
  username: string;
  email: string;
  password: string;
}

interface SignUpFormProps {
  records: Record[];
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ records, setRecords }) => {
  const navigate = useNavigate();
  //const [records, setRecords] = useState<Record[]>([]);

  const [formData, setFormData] = useState({
    id: 0,
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isUsernameTaken = records.some(
      (record) => record.username === formData.username
    );

    if (isUsernameTaken) {
      alert("Username already exists");
      navigate("./LoginForm");
      return;
    } else {
      //const newRecord = { ...formData};
      const newRecord: Record = {
        id: new Date().getTime(), // Current timestamp as the ID
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      setRecords([...records, newRecord]);
      console.log(records);
      setFormData({ id: 0, username: "", email: "", password: "" });
      navigate('./LoginForm');
    }
  };

  return (
    <form
      className="form"
      
      onSubmit={handleSubmit}
    >
      <h2>Sign Up</h2>
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
        <label>Email</label>
        <br></br>
        <input
          className="email"
          type="email"
          name="email"
          value={formData.email}
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
      <button className="signup-btn" type="submit" onChange={handleSubmit}>
        Sign Up
      </button>
      <button className='signin-btn' onClick={() => navigate("./LoginForm")}>Login</button>
      
    </form>
  );
};

export default SignUpForm;
