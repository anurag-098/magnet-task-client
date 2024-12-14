
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.scss'
import { postRequest } from "../services";


const Login = () => {
 

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    postRequest("/user/login", {
      email: e.target.email.value,
      password: e.target.password.value,
    }).then((response) => {
      if (response.status === 200) {
        console.log( response.data.data.token);
        sessionStorage.setItem("authToken", response.data.data.token);
        sessionStorage.setItem("userId", response.data.data.userId);
        navigate("/");
      }
    });
  };

  return (
    <div className="login-page w-full h-full flex justify-center align-center">

<form className="login-container flex justify-center items-center" onSubmit={handleSubmit}>
  <h2 className="text-3xl font-bold underline">Login</h2>
  <input type="email" placeholder="Email" required name="email" />
  <input type="password"  placeholder="********" required  name="password"/>
  <button type="submit">Login</button>
        <p> Dont have an account? <Link to="/register" style={{ textDecoration: 'none', color:'#1976D2' }}>Register</Link></p>
</form>

    </div>
  );
};

export default Login;
