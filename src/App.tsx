
import React,{useState} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpForm from './Components/SignUpForm'; // Update the path if needed
import LoginForm from './Components/LoginForm'; // Update the path if needed
import Feed from './Components/Feed';


interface Record {
  id:number,
  username: string;
 email: string;
  password: string;
}



const App: React.FC = () => {
  const [users, setUsers] = useState<Record[]>([]);
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpForm  records={users} setRecords={setUsers}/>} />
        <Route path="/LoginForm" element={<LoginForm records={users}/>} />
        <Route path="/Feed" element={<Feed/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import SignUpForm from './Components/SignUpForm';
// import LoginForm from './Components/LoginForm';


// interface Record {
//      username: string;
//     email: string;
//      password: string;
//    }
// const App: React.FC = () => {
//   const [records, setRecords] = useState<Record[]>([]);

//   const renderSignUpForm = () => (
//     <SignUpForm records={records} setRecords={setRecords} />
//   );

//   const renderLoginForm = () => (
//     <LoginForm records={records} />
//   );
//   return (
//     <BrowserRouter>
//       <Routes>
//       <Route path="/SignUpForm" element={renderSignUpForm} />
//       <Route path="/LoginForm" element={renderLoginForm} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
