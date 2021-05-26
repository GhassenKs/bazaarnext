import react from 'react'
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';


const Protectedroutes = ({component: Component, ...rest}) => {
  const initialState = {
    user: null
  };
  
  if (localStorage.getItem('jwtToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
  
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('jwtToken');
    } else {
      initialState.user = decodedToken;
    }
  }

  console.log(initialState.user)

      return (
        <Route {...rest} render={
          (props) => {
            if (!initialState.user) {
                return <Redirect to="/" />
            } else {
             
              return <Component {...props} />
                
              
            }
        }
      } />
    )

}
export default Protectedroutes;










