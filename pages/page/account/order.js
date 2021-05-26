import React from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import MyOrder from './common/myorder';


const myorder = () => {
    return (
        <CommonLayout parent="home" title="cart">
            <MyOrder />
        </CommonLayout>
    )
}

export default myorder;