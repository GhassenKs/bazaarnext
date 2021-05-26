import React, { useState, useContext } from 'react';
import Link from 'next/link';
import CartContext from '../../../../helpers/cart';
import { Container, Row, Col, Media, Input } from 'reactstrap';
import { CurrencyContext } from '../../../../helpers/Currency/CurrencyContext';
import cart from '../../../../public/assets/images/icon-empty-cart.png';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import jwtDecode from 'jwt-decode';

const PLACE_ORDER = gql`
    query findOrder($id:String) {findOrder(id:$id){id,user{firstName},placedItems {
                _id
                id
                title
                description
                type
                brand
                category 
                price
                new
                stock
                sale
                discount
                variants{
                    id
                    sku
                    size
                    color
                    image_id
                }
                images{
                    image_id
                    id
                    alt
                    src
                }
            }}}
`;



const CartPage = () => {
    const context = useContext(CartContext);
    const cartItems = context.state;
    const curContext = useContext(CurrencyContext);
    const symbol = curContext.state.symbol
    const total = context.cartTotal
    const removeFromCart = context.removeFromCart;
    const [stock1, setStock] = useState("InStock")
    const [quantity, setQty] = useState(1)
    const [quantityError, setQuantityError] = useState(false);
    const updateQty = context.updateQty;


    //-------

    
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
    
  
    
  
    
  
    const { loading,error,  data:orders } =  useQuery(PLACE_ORDER, {
      variables: {
          
          id:"608ddc0ad3049a52dc87f642"
      }
  });

  console.log(orders)
    //----------


    const handleQtyUpdate = (item, quantity) => {
        if (quantity >= 1) {
            setQuantityError(false)
            updateQty(item, quantity)
        } else {
            setQuantityError(true)
        }
    }


    const changeQty = (e) => {
        setQuantity(parseInt(e.target.value));
    }

    const minusQty = () => {
        if (quantity > 1) {
            setStock('InStock')
            setQty(quantity - 1);
        }
    }


    const plusQty = (product) => {
        if (product.stock >= quantity) {
            setQty(quantity + 1);
        } else {
            setStock('Out of Stock !')
        }
    }
    



   const orderps = orders ?
        

(
        
        <div>
            {cartItems && cartItems.length > 0 ?
                <section className="cart-section section-b-space">
                    <Container>
                        <Row>
                            <Col sm="12">
                                <table className="table cart-table table-responsive-xs">
                                    <thead>
                                        <tr className="table-head">
                                            <th scope="col">image</th>
                                            <th scope="col">produit</th>
                                            <th scope="col">prix</th>
                                            <th scope="col">quantité</th>
                                            <th scope="col">action</th>
                                            <th scope="col">total</th>
                                        </tr>
                                    </thead>
                                    {cartItems.map((item, index) => {

                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td>
                                                        <Link href={`/left-sidebar/product/` + item.id}>
                                                            <a>
                                                                <Media src={item.images ?
                                                                    item.images[0].src
                                                                    : item.images[0].src} alt="" />
                                                            </a>
                                                        </Link>

                                                    </td>
                                                    <td>
                                                        <Link href={`/left-sidebar/product/` + item.id}>
                                                            <a>
                                                                {item.title}
                                                            </a>
                                                        </Link>
                                                        <div className="mobile-cart-content row">
                                                            <div className="col-xs-3">
                                                            <div className="qty-box">
                                                            <div className="input-group">
                                                                <input
                                                                    type="number"
                                                                    name="quantity"
                                                                    onChange={(e) => handleQtyUpdate(item, e.target.value)}
                                                                    className="form-control input-number"
                                                                    defaultValue={item.qty}
                                                                    style={{ borderColor: quantityError && 'red' }}
                                                                />
                                                            </div>
                                                        </div>{(item.qty >= item.stock) ? 'out of Stock' : ''}
                                                            </div>
                                                            <div className="col-xs-3">
                                                                <h2 className="td-color">{symbol}{item.price - (item.price * item.discount / 100)}</h2>
                                                            </div>
                                                            <div className="col-xs-3">
                                                                <h2 className="td-color"><a href="#" className="icon"><i className="fa fa-times"  onClick={() => removeFromCart(item)}></i></a>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><h2>{symbol}{item.price - (item.price * item.discount / 100)}</h2></td>
                                                    <td>
                                                        <div className="qty-box">
                                                            <div className="input-group">
                                                                <input
                                                                    type="number"
                                                                    name="quantity"
                                                                    onChange={(e) => handleQtyUpdate(item, e.target.value)}
                                                                    className="form-control input-number"
                                                                    defaultValue={item.qty}
                                                                    style={{ borderColor: quantityError && 'red' }}
                                                                />
                                                            </div>
                                                        </div>{(item.qty >= item.stock) ? 'En rupture de stock' : ''}
                                                    </td>
                                                    <td>
                                                        
                                                        <i className="fa fa-times" onClick={() => removeFromCart(item)}></i>
                                                       
                                                    </td>
                                                    <td><h2 className="td-color">{symbol}{item.total}</h2></td>
                                                </tr>
                                            </tbody>)
                                    })}
                                </table>
                                <table className="table cart-table table-responsive-md">
                                    <tfoot>
                                        <tr>
                                            <td>Prix total :</td>
                                            <td><h2>{symbol} {total} </h2></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </Col>
                        </Row>
                        <Row className="cart-buttons">
                            <Col xs="6">
                                <Link href={`/shop/left_sidebar`} >
                                    <a className="btn btn-solid">
                                        continuer vos achats
                                    </a>
                                </Link>
                            </Col>
                            <Col xs="6">
                                <Link href={`/page/account/checkout`} ><a className="btn btn-solid">verifier</a></Link>
                            </Col>
                        </Row>
                    </Container>
                </section>
                :
                <section className="cart-section section-b-space">
                    <Container>
                        <Row>
                            <Col sm="12">
                                <div >
                                    <div className="col-sm-12 empty-cart-cls text-center">
                                        <Media src={cart} className="img-fluid mb-4 mx-auto" alt="" />
                                        <h3>
                                            <strong>Votre panier est vide</strong>
                                        </h3>
                                        <h4>Explorez plus de présélection de certains éléments.</h4>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            }
        </div>
    
    ): 
<p>no orders</p>


    return(orderps)
}


export default CartPage;