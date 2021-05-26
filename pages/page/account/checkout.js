import React, { useEffect,useState } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import firebase from '../../../config/base'
import CheckoutPage from './common/checkout-page';
import Login from '../../page/account/login'
import jwtDecode from 'jwt-decode';


const Checkout = () => {
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

    return (
        <>
        {initialState.user ?
            <CommonLayout parent="home" title="checkout">
                <CheckoutPage />
            </CommonLayout>
        :
        <Login/>
        }
        </>
    )
}

export default Checkout;