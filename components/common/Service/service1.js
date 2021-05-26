import React from 'react';
import {
    svgFreeShipping,
    svgservice,
    svgoffer
} from "../../../services/script"
import { Container, Row, Col } from 'reactstrap';

const ServiceLayout = ({sectionClass}) => {
    return (
        <Container>
            <section className={sectionClass}>
                <Row>
                    <Col md='4' className="service-block">
                        <div className="media">
                            <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                            <div className="media-body">
                                <h4>Livraison gratuite</h4>
                                <p>Livraison gratuite a l'echelle regionale</p>
                            </div>
                        </div>
                    </Col>
                    <Col md='4' className="service-block">
                        <div className="media">
                            <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                            <div className="media-body">
                                <h4>service 24H/24</h4>
                                <p>service en ligne pour nouveau client</p>
                            </div>
                        </div>
                    </Col>
                    <Col md='4' className="service-block">
                        <div className="media">
                            <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                            <div className="media-body">
                                <h4>offre festival</h4>
                                <p>offre festival pour les nouveau clients</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </Container>
    );
}

export default ServiceLayout;