import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  to: React.ReactElement; // Typing for the component to render
}

const ProtectedRoute: React.FC<Props> = ({ to }) => {
  // const [auth, setAuth] = useState<string | null>(null); // Type state as string or null


  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   // setAuth(token);
  //   console.log('authto', token);
  // }, []); 
  if (sessionStorage.getItem("authToken")&&sessionStorage.getItem("authToken") !== '') {
    return to; 
  } else {
    return <Navigate to="/login" replace />
  }
};

export default ProtectedRoute;
