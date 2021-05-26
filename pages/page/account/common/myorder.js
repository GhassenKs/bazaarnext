import React, { useState, useContext } from 'react';
import Link from 'next/link';
import CartContext from '../../../../helpers/cart';
import { Container, Row, Col, Media, Input } from 'reactstrap';
import { CurrencyContext } from '../../../../helpers/Currency/CurrencyContext';
import cart from '../../../../public/assets/images/icon-empty-cart.png';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import jwtDecode from 'jwt-decode'
    


const PLACE_ORDER = gql`
    query findOrder($id:String) {
        findOrder(id:$id){id,user{firstName},
        placedItems {
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




const MyOrder = () => {
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

    const handleQtyUpdate = (item, quantity) => {
        if (quantity >= 1) {
            setQuantityError(false)
            updateQty(item, quantity)
        } else {
            setQuantityError(true)
        }
    }


    

    const initialState = {
        user: null
    }
    if (localStorage.getItem('jwtToken')) {
        const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
      
          if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('jwtToken');
          } else {
            initialState.user = decodedToken;
      }
      }
      console.log(initialState.user.id)
    var { loading, data, fetchMore } = useQuery(PLACE_ORDER, {
        variables: {
            

           id: initialState.user.id

        }
    });
    console.log(data)
    return (
        
        <div>
            {data  ?
                <section className="cart-section section-b-space">
                    <Container>
                        <Row>
                            <Col sm="12">
                                <table className="table cart-table table-responsive-xs">
                                    <thead>
                                        <tr className="table-head">
                                            <th scope="col">Image</th>
                                            <th scope="col">produit</th>
                                            <th scope="col">prix</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">action</th>
                                            <th scope="col">total</th>
                                        </tr>
                                    </thead>
                                    {data.findOrder.map((item, index) => {

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
                                                        <Link href={`/product-details/` + item.id}>
                                                            <a>
                                                                {item.title}
                                                            </a>
                                                        </Link>
                                                       
                                                    </td>
                                                    <td><h2>{symbol}{item.price - (item.price * item.discount / 100)}</h2></td>
                                                   
                                                    
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
                                            <strong>Vous n'avez pas de produit acheté</strong>
                                        </h3>
                                        <br/>
                                        <br />
                                        <Link href={`/`} >
                                             <a className="btn btn-solid">
                                        Revenir a la page d'accueil
                                            </a>
                                </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            }
        </div>
    )
}


export default MyOrder;