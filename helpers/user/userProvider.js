import React, { useState } from 'react';
import UserContext from './userContext';
import jwtDecode from 'jwt-decode';


const userProvider = (props) => {

    const [decodedToken,setDecodedToken]= useState([])
    const [initialState, setInitialState]= useState([])

        if (localStorage.getItem('jwtToken')) {
          setDecodedToken(jwtDecode(localStorage.getItem('jwtToken')));
        
            if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem('jwtToken');
            } else {
             setInitialState(decodedToken)
            
        }
        }
        console.log('here in usercontext')
        console.log(initialState)
        
    return (
        <UserContext.Provider
            value={{
                ...props,
                state: initialState,
            }}>
            {props.children}
        </UserContext.Provider>
    )


}

export default userProvider;