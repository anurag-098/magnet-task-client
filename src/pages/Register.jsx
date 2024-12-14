
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.scss";
import { postRequest } from "../services";
const Register = () => {

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    postRequest("/user/register", {
      email: e.target.email.value,
      password: e.target.password.value,
    }).then((response) => {
      if (response.status === 201) {
        navigate("/login");
      }
    });
  };

  return (
    <div className="login-page w-full h-full flex justify-center align-center">
      <form
        className="login-container flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold underline">Sign up</h2>
        <input type="email" placeholder="Email" required name="email" />
        <input
          type="password"
          placeholder="********"
          required
          name="password"
        />
        <button type="submit">Signup</button>
        <p>
          {" "}
          Aldready have an account? <Link to="/login" style={{ textDecoration: 'none', color:'#1976D2' }}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
