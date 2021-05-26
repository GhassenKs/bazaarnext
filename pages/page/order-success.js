import React, { useContext } from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Container, Row, Col, Media } from 'reactstrap';
import one from '../../public/assets/images/pro3/1.jpg';
import CartContext from '../../helpers/cart';
import { CurrencyContext } from '../../helpers/Currency/CurrencyContext';
import jwtDecode from 'jwt-decode';




const FIND_ORDER = gql`
    query findOrder($id:String){findOrder(id:$id){id,user{firstName}}}
`;

const OrderSuccess = () => {
    const cartContext = useContext(CartContext);
    const cartItems = cartContext.state;
    const cartTotal = cartContext.cartTotal;
    const curContext = useContext(CurrencyContext);
    const symbol = curContext.state.symbol;

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

      console.log(data)
    return (
        <CommonLayout parent="home" title="order success">
            <section className="section-b-space light-layout">
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="success-text"><i className="fa fa-check-circle" aria-hidden="true"></i>
                                <h2>Merci !</h2>
                                <p>Le paiement est traité avec succès et votre commande est en route</p>
                                <p>Transaction ID: {data.findOrder.id} </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>



            <section className="section-b-space">
                <Container>
                    <Row>
                        <Col lg="6">
                            <div className="product-order">
                                <h3>détails de votre commande</h3>

                                {cartItems.map((item, i) =>
                                    <Row className="product-order-detail" key={i}>
                                        <Col xs="3" >
                                            <Media src={item.images[0].src} alt=""
                                                className="img-fluid blur-up lazyload" />
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>Nom</h4>
                                                <h5>{item.title}</h5>
                                            </div>
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>quantité</h4>
                                                <h5>{item.qty}</h5>
                                            </div>
                                        </Col>
                                        <Col xs="3" className="order_detail">
                                            <div>
                                                <h4>prix</h4>
                                                <h5>{symbol}{item.price}</h5>
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                                
                                <div className="final-total">
                                    <h3>total <span>{symbol}{cartTotal}</span></h3>
                                </div>
                            </div>
                        </Col>
                        <Col lg="6">
                            <Row className="order-success-sec">
                                <Col sm="6">
                                    <h4>summery</h4>
                                    <ul className="order-detail">
                                        <li>order ID:</li>
                                        <li>Order Date: October 22, 2021</li>
                                        <li>Order Total: {symbol}{cartTotal}</li>
                                    </ul>
                                </Col>
                                <Col sm="6">
                                    <h4>shipping address</h4>
                                    <ul className="order-detail">
                                        <li></li>
                                        
                                        <li>Contact No. {initialState.user.phone}</li>
                                    </ul>
                                </Col>
                                <Col sm="12" className="payment-mode">
                                    <h4>payment method</h4>
                                    <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking
                                acceptance subject to device availability.</p>
                                </Col>
                                <Col md="12">
                                    <div className="delivery-sec">
                                        <h3>expected date of delivery</h3>
                                        <h2>october 22, 2021</h2>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export default OrderSuccess;