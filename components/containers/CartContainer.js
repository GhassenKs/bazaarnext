import React, { useContext, Fragment } from 'react';
import Link from 'next/link';
import CartHeader from '../headers/common/cart-header';
import CartContext from '../../helpers/cart';
import { Media } from 'reactstrap';
import { CurrencyContext } from '../../helpers/Currency/CurrencyContext';

const CartContainer = ({icon}) => {
    const context = useContext(CartContext);
    const currContext = useContext(CurrencyContext);
    const symbol = currContext.state.symbol;
    const cartList = context.state;
    const total = context.cartTotal;

    return (
        <Fragment>
            <li className="onhover-div mobile-cart" >
                <div className="cart-qty-cls">{cartList.length}</div>
                <Link href={`/page/account/cart`}>
                    <div>
                        <Media src={icon} className="img-fluid" alt="" />
                        <i className="fa fa-shopping-cart"></i>
                    </div>
                </Link>
                <ul className="show-div shopping-cart">
                    {cartList.map((item, index) => (
                        <CartHeader key={index} item={item} total={total} symbol={symbol} />
                    ))}
                    
                    {(cartList.length > 0) ?
                        <div>
                            <li>
                                <div className="total">
                                    <h5>Total : <span><strong>{total}{symbol}</strong></span></h5>
                                </div>
                            </li>
                            <li>
                                <div className="buttons view-cart">
                                    <Link href={`/page/account/cart`} >
                                    <a type="button"className="btn btn-outline-primary cart">Voir panier</a>
                                    </Link>
                                    <Link href={`/page/account/checkout`} >
                                    <a type="button" className="btn btn-primary checkout">Verifier</a>
                                    </Link>
                                </div>
                            </li>
                            </div>
                        :
                        <li><h5>Votre panier est vide.</h5></li>}
                </ul>
            </li>
        </Fragment>

    )
}


export default CartContainer;
