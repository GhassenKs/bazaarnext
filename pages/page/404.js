import React, { useState } from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Container, Row, Col } from 'reactstrap';
import { useRouter } from 'next/router'

const Error = () => {

    const router = useRouter()
    const handleClick = (e) => 
    {
        e.preventDefault()
        router.push('../page/account/login')
    }
    
    return (
        <CommonLayout parent="home" title="404">
            <section className="p-0">
                <Container>
                    <Row>
                        <Col sm="12">
                            <div className="error-section">
                                <h1>404</h1>
                                <h2>page not found</h2>
                                <a href="/" className="btn btn-solid">back to home</a>
                                
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}
export default Error;