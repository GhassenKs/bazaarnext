import React, { useContext, useState } from 'react';
import { Media, Container, Form, Row, Input, Col } from 'reactstrap';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import CartContext from '../../../../helpers/cart';
import paypal from '../../../../public/assets/images/paypal.png';
import { useForm } from 'react-hook-form';
import {useRouter} from 'next/router';
import { CurrencyContext } from '../../../../helpers/Currency/CurrencyContext';
import jwtDecode from 'jwt-decode';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
 

const PLACE_ORDER = gql`
  mutation placeList($id:String) {

    placeList(id:$id){id}
}
  
`;

const CheckoutPage = () => {
    const cartContext = useContext(CartContext);
    const cartItems = cartContext.state;
    const cartTotal = cartContext.cartTotal;
    const curContext = useContext(CurrencyContext);
    const symbol = curContext.state.symbol
    const [obj, setObj] = useState({});
    const [payment, setPayment] = useState('stripe');
    const { register, handleSubmit, errors } = useForm(); // initialise the hook
    const router = useRouter();
    //checking user

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
    
    var userID= null;
    if(initialState.user){userID=initialState.user.id}

    const [placeList, { data:orderPlaced }] = useMutation(PLACE_ORDER);
  
      //end of this
    const checkhandle = (value) => {
        setPayment(value)
    }

    const onSuccess = (payment) => {
        router.push({
            pathname: '/portfolio/order-success-2',
            state: { payment: payment, items: cartItems, orderTotal: total, symbol: symbol }
        })

    }

    const onSubmit = data => {

        if (data !== '') {
            var list = []
            
            placeList({

                variables: {
                   id:userID
                  
                 }
                });
                localStorage.setItem("cartList",JSON.stringify(list))
            
            router.push({
                pathname: '/portfolio/order-success-2',
                
            })
       
    };  
}                                                                                                                                                                                                                                                                                                                                                        

    const setStateFromInput = (event) => {
        obj[event.target.name] = event.target.value;
        setObj(obj)
    }


    const onCancel = (data) => {
        console.log('The payment was cancelled!', data);
    }

    const onError = (err) => {
        console.log("Error!", err);
    }

    const client = {
        sandbox: 'AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_',
        production: 'AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_',
    }
    
      if (localStorage.getItem('jwtToken')) {
        const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
      
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('jwtToken');
        } else {
          initialState.user = decodedToken;
        }
      } 
    
 
    const checkout = initialState.user ?
    (

        <section className="section-b-space">
            <Container>
                <div className="checkout-page">
                    <div className="checkout-form">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg="6" sm="12" xs="12">
                                    <div className="checkout-title">
                                        <h3>Billing Details</h3>
                                    </div>
                                    <div className="row check-out">
                                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                             
                                        <div className="field-label">Prenom</div>
                                            <h4>{initialState.user.firstName}</h4>
                                        </div>
                                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                            <div className="field-label">Nom</div>
                                            <h4>{initialState.user.lastName}</h4>

                                        </div>
                                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                            <div className="field-label">Numero de telephone</div>
                                            <h4>{initialState.user.phone}</h4>

                                        </div>
                                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                            <div className="field-label">email</div>
                                            <h4>{initialState.user.email}</h4>

                                        </div>
                                        
                                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                            <div className="field-label">Addresse</div>
                                            <h4>{initialState.user.address}</h4>

                                        </div>
                                        
                                        
                                        <div className="form-group col-md-12 col-sm-6 col-xs-12">
                                            <div className="field-label">Code postal</div>
                                            <h4>{initialState.user.zipcode}</h4>

                                        </div>
                                       
                                    </div>
                                </Col>
                                <Col lg="6" sm="12" xs="12">
                                    {cartItems && cartItems.length > 0 ?
                                        <div className="checkout-details">
                                            <div className="order-box">
                                                <div className="title-box">
                                                    <div>Produit <span>Total</span></div>
                                                </div>
                                                <ul className="qty">
                                                    {cartItems.map((item, index) =>
                                                    <div>
                                                       
                                                        <li key={index}><td><h4>{item.title}</h4></td><span><td>{item.total} {symbol}</td></span></li>
                                                        <li key={index}> Qté: {item.qty}</li> 
                                                    </div>
                                                    )}
                                                </ul>
                                                <ul className="sub-total">
                                                    <li>Total <span className="count"><strong>{cartTotal} {symbol}</strong></span></li>
                                                    <li>Livraison
                                                        <div className="shipping">
                                                            <div className="shopping-option">
                                                                <input type="checkbox" name="free-shipping" id="free-shipping" />
                                                                <label htmlFor="free-shipping">gratuite</label>
                                                            </div>
                                                            
                                                        </div>
                                                    </li>
                                                </ul>
                                                <ul className="total">
                                                    <li>Total <span className="count">{cartTotal} {symbol}</span></li>
                                                </ul>
                                            </div>
                                            {(cartTotal !== 0) ?
                                                    <div className="text-right">
                                                         <button type="submit" className="btn-solid btn" >passer la commande</button> 
                                                            
                                                    </div>
                                                    : ''}
                                        </div>
                                        : ''}

                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </Container>
        </section>
    ) :

    <Page404 />
    
return(checkout)

}

export default CheckoutPage;