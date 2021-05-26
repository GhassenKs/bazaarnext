import React from 'react';
import { Container, Row, Col, Media } from 'reactstrap';
import banner5 from '../../../../public/assets/images/vegetables/pro/25.jpg';
import banner10 from '../../../../public/assets/images/vegetables/pro/15.jpg';
import banner9 from '../../../../public/assets/images/vegetables/pro/55.jpg';
import banner8 from '../../../../public/assets/images/vegetables/pro/56.jpg';


const Collections = () => (
    <section className="banner-padding banner-furniture ratio2_1">
        <Container fluid={true}>
            <Row className="partition4">
                <Col lg="3" md="6">
                    <a href="/shop/left_sidebar?&category=Dresses&brand=&color=&size=&minPrice=0&maxPrice=500">
                        <div className="collection-banner p-right text-right">
                            <div className="img-part">
                                <Media src={banner5}
                                    className="img-fluid blur-up lazyload bg-img" />
                            </div>
                            <div className="contain-banner banner-4">
                                <div>
                                    <h4>30%</h4>
                                    <h2>Femme</h2>
                                </div>
                            </div>
                        </div>
                    </a>
                </Col>
                <Col lg="3" md="6">
                    <a href="/shop/left_sidebar?&category=headphonesnearphones&brand=&color=&size=&minPrice=0&maxPrice=500">
                        <div className="collection-banner p-right text-right">
                            <div className="img-part">
                                <Media src={banner10} className="img-fluid blur-up lazyload bg-img" />
                            </div>
                            <div className="contain-banner banner-4">
                                <div>
                                    <h4>60%</h4>
                                    <h2>Ecouteurs</h2>
                                </div>
                            </div>
                        </div>
                    </a>
                </Col>
                <Col lg="3" md="6">
                    <a href="/shop/left_sidebar?&category=desktopC&brand=&color=&size=&minPrice=0&maxPrice=500">
                        <div className="collection-banner p-right">
                            <div className="img-part">
                                <Media src={banner8}
                                    className="img-fluid blur-up lazyload bg-img" />
                            </div>
                            <div className="contain-banner banner-4">
                                <div>
                                    <h4>60%</h4>
                                    <h2>Electronics</h2>
                                </div>
                            </div>
                        </div>
                    </a>
                </Col>
                <Col lg="3" md="6">
                    <a href="/shop/left_sidebar?&category=treats&brand=&color=&size=&minPrice=0&maxPrice=500">
                        <div className="collection-banner p-left">
                            <div className="img-part">
                                <Media src={banner9}
                                    className="img-fluid blur-up lazyload bg-img" />
                            </div>
                            <div className="contain-banner banner-4">
                                <div>
                                    <h4>60%</h4>
                                    <h2>Camera</h2>
                                </div>
                            </div>
                        </div>
                    </a>
                </Col>
            </Row>
        </Container>
    </section>
)

export default Collections;