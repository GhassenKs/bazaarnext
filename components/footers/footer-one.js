import React, { useEffect } from 'react';
import Link from 'next/link'
import { SlideUpDown } from "../../services/script"
import LogoImage from "../headers/common/logo"
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import CopyRight from './common/copyright';
import jwtDecode from 'jwt-decode';

const FooterOne = ({ fluid, logoName ,layoutClass ,footerClass }) => {
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
    
    useEffect(() => {
        var contentwidth = window.innerWidth;
        if ((contentwidth) < 750) {
            SlideUpDown('footer-title');
        } else {
            var elems = document.querySelectorAll(".footer-title");
            [].forEach.call(elems, function (elemt) {
                let el = elemt.nextElementSibling;
                el.style = "display: block";
            });
        }
    }, [])

    return (
        <footer className={`footer-light ${footerClass}`}>
            
            <section className="section-b-space light-layout">
                <Container  fluid={fluid}>
                    <Row className="footer-theme partition-f">
                        <Col lg="4" md="6">
                            <div className="footer-title footer-mobile-title">
                                <h4>about</h4>
                            </div>
                            <div className="footer-contant">
                                <div className="footer-logo">
                                    <LogoImage logo={logoName} />
                                </div>
                                <p>Dites bonjour à vos nouveaux achats en ligne préférés! Chez <strong>Baazar.tn</strong>, notre objectif principal est de fournir à nos clients extraordinaires tout ce dont ils ont besoin à des prix abordables
                                      </p>
                                <div className="footer-social">
                                    <ul>
                                        <li>
                                            <a href="https://www.facebook.com/1onepack/" target="_blank">  <i className="fa fa-facebook" aria-hidden="true"></i> </a>
                                        </li>
                                        <li>
                                            <a href="https://www.onepack.tech/" target="_blank"> <i className="fa fa-google-plus" aria-hidden="true"></i></a>
                                        </li>
                                       
                                        <li>
                                            <a href="https://www.instagram.com/1one_pack" target="_blank"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                                        </li>
                                       
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col className="offset-xl-1">
                            <div className="sub-title">
                                <div className="footer-title">
                                    <h4></h4>
                                </div>
                                <div className="footer-contant">
                                    
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="sub-title">
                                <div className="footer-title">
                                    <h4>Compte</h4>
                                </div>
                                <div className="footer-contant">
                                <ul>
                                        <li> {initialState.user ?
                                            <Link href={`/page/account/dashboard`} >
                                                <a>Profile</a>
                                            </Link> 
                                            :
                                            <Link href={`/page/account/login`} >
                                                <a>Login</a>
                                            </Link> }
                                        </li>
                                        <li>
                                            <Link href={`/shop/left_sidebar`} ><a>Mes commandes</a></Link>
                                        </li>
                                    
                                        <li>
                                            <Link href={`/shop/left_sidebar`} ><a>Liste de souhaits</a></Link>
                                        </li>
                                    </ul>
                            </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="sub-title">
                                <div className="footer-title">
                                    <h4>Plus d'information</h4>
                                </div>
                                <div className="footer-contant">
                                    <ul className="contact-list">
                                        <li><i className="fa fa-map-marker"></i>Immeuble le montplaisir -
                                         A64, Avenue Kheireddine Pacha, Tunis 1067
                                            </li>
                                        <li><i className="fa fa-phone"></i> 00 216 52 588 822</li>
                                        <li><i className="fa fa-envelope-o"></i> <a
                                            href="#">contact@onepack.tech</a></li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            
        </footer>
    )
}


export default FooterOne;