import React from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import CartPage from './common/myOrders-page';


const Wishliat = () => {
    return (
        <CommonLayout parent="home" title="cart">
            <CartPage />
        </CommonLayout>
    )
}

export default Wishliat;