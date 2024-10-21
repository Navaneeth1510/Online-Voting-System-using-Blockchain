import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, isAllowed }) {
  return isAllowed ? children : <Navigate to="/" />;
}

export default PrivateRoute;
