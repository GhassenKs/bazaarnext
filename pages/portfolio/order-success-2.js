import React,  { useContext } from 'react';
import { Table, Media } from 'reactstrap';
import facebook from '../../public/assets/images/email-temp/facebook.png';
import youtube from '../../public/assets/images/email-temp/youtube.png';
import twitter from '../../public/assets/images/email-temp/twitter.png';
import gplus from '../../public/assets/images/email-temp/gplus.png';
import linkdin from '../../public/assets/images/email-temp/linkedin.png';
import pinterest from '../../public/assets/images/email-temp/pinterest.png'
import space from '../../public/assets/images/email-temp/space.jpg';
import delivery2 from '../../public/assets/images/email-temp/delivery-2.png';
import gql from 'graphql-tag';
import CartContext from '../../helpers/cart';
import { CurrencyContext } from '../../helpers/Currency/CurrencyContext';
import { useQuery } from '@apollo/react-hooks';
import jwtDecode from 'jwt-decode';
import { useHistory } from "react-router-dom";
import Link from 'next/link';




const FIND_ORDER = gql`
    query findOrder($id:String){findOrder(id:$id){id,user{firstName}}}
`;

const OrderSuccess2 = (props) => {
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

      var { loading, data } = useQuery(FIND_ORDER, {
        variables: {
        id: initialState.user.id
        }
    });
    
    
    return(
        <div>
        <Table style={{padding: "0 30px", marginBottom: "0", backgroundColor: "#fff",  boxShadow: "0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353)", width: "100%"}} borderless className="email-template-table" cellPadding="0" cellSpacing="0">
            <tbody>
                <tr>
                    
                    <td>
                        <Link href='/'>Retour a la page d'accueil</Link>
                        <Table align="left" border="0" cellPadding="0" cellSpacing="0" style={{ textAlign: "left" }} width="100%">
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: "center" }}>
                                        <Media src={delivery2} alt="" style={{ margin: "0 auto 30px" }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p style={{ fontSize: "14px" }}><b>Bonjour {initialState.user.firstName}</b></p>
                                        <p style={{ fontSize: "14px" }}>Le paiement est traité avec succès et votre commande est en route</p>
                                        <p style={{ fontSize: "14px" }}>Identifiant: {data.findOrder.id}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                        <Table cellPadding="0" cellSpacing="0" border="0" align="left" style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}>
                            <tbody>
                                <tr>
                                    <td style={{ backgroundColor: "#fafafa", border: "1px solid #ddd", padding: "15px", letterSpacing: "0.3px", width: "50%" }}>
                                        <h5 style={{ fontSize: "16px", fontWeight: "600", color: "#000000", lineHeight: "16px", paddingBottom: "13px", borderBottom: "1px solid #e6e8eb", letterSpacing: "-0.65px", marginTop: "0", marginBottom: "13px" }}>Addresse</h5>
                                        <p style={{ textAlign: "left", fontWeight: "normal", fontSize: "14px", color: "#000000", lineHeight: "21px", marginTop: "0" }}>{initialState.user.addresse}</p>
                                    </td>
                                    <td><Media src={space} alt=" " height="25" width="30" /></td>
                                    <td style={{ backgroundColor: "#fafafa", border: "1px solid #ddd", padding: "15px", letterSpacing: "0.3px", width: "50%" }}>
                                        <h5 style={{ fontSize: "16px", fontWeight: "600", color: "#000000", lineHeight: "16px", paddingBottom: "13px", borderBottom: "1px solid #e6e8eb", letterSpacing: "-0.65px", marginTop: "0", marginBottom: "13px" }}>Addresse de livraison</h5>
                                        <p style={{ textAlign: "left", fontWeight: "normal", fontSize: "14px", color: "#000000", lineHeight: "21px", marginTop: "0" }}>{initialState.user.addresse}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table bordered className="order-detail" border="0" cellPadding="0" cellSpacing="0" align="left" style={{ width: "100%", marginBottom: "50px" }}>
                            <thead>
                                <tr className="email-tr">
                                    <th>PRODUIT</th>
                                    <th style={{ paddingLeft: "15px" }}>DESCRIPTION</th>
                                    <th>QUANTITE</th>
                                    <th>PRIX </th>
                                </tr>
                            </thead>
                            <tbody>
                            {cartItems.map((item, i) =>
                                <tr className="email-tr">
                                
                                
                               
                                    <td>
                                        <Media src={item.images[0].src} alt=""
                                                className="img-fluid blur-up lazyload"  width="80" />
                                    </td>
                                    
                                    <td valign="top" style={{ paddingLeft: "15px" }}>
                                    
                                        <h5 style={{ marginTop: "15px" }}>{item.title}</h5>
                                    </td>
                                    <td valign="top" style={{ paddingLeft: "15px" }}>
                                        <h5 style={{ fontSize: "14px", color: "#444", marginTop: "15px", marginBottom: "0px" }}>Size : <span>{item.size}</span> </h5>
                                        <h5 style={{ fontSize: "14px", color: "#444", marginTop: "10px" }}>QTY : <span>{item.qty}</span></h5>
                                    </td>
                                    <td valign="top" style={{ paddingLeft: "15px" }}>
                                        <h5 style={{ fontSize: "14px", color: "#444", marginTop: "15px" }}><b> {(item.price - (item.price * item.discount / 100)) * item.qty} {symbol}</b></h5>
                                    </td>
                                   
                               
                                </tr>
                            )}
                                
                                
                                <tr className="pad-left-right-space">
                                    <td className="m-t-5" colSpan={2} align="left">
                                        <p style={{ fontSize: "14px" }}>Subtotal : </p>
                                    </td>
                                    <td className="m-t-5" colSpan={2} align="right">
                                        <p>{symbol}{cartTotal}</p>
                                    </td>
                                </tr>
                                
                                <tr className="pad-left-right-space">
                                    <td colSpan={2} align="left">
                                        <p style={{ fontSize: "14px" }}>Livraison :</p>
                                    </td>
                                    <td colSpan={2} align="right">
                                        <p>gratuite</p>
                                    </td>
                                </tr>
                               
                                <tr className="pad-left-right-space ">
                                    <td className="m-b-5" colSpan={2} align="left">
                                        <p style={{ fontSize: "14px" }}>Total :</p>
                                    </td>
                                    <td className="m-b-5" colSpan={2} align="right">
                                        <b>{symbol}{cartTotal}</b>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </td>
                </tr>
            </tbody>
        </Table>
        <Table className="main-bg-light text-center top-0" align="center" borderless cellPadding="0" cellSpacing="0" width="100%">
                <tbody>
                    <tr>
                        <td style={{ padding: "30px" }}>
                            <div>
                                <h4 className="title" style={{ margin: "0", textAlign: "center" }}>Abonnez vous</h4>
                            </div>
                            <Table border="0" cellPadding="0" cellSpacing="0" className="footer-social-icon text-center" align="center" style={{ marginTop: "20px" }}>
                                <tbody>
                                    <tr style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                                        <td>
                                            <Link href="www.facebook.com/1onepack/"><img src={facebook} alt="" /></Link>
                                        </td>
                                                                                
                                        <td>
                                            <a href="#"><img src={gplus} alt="" /></a>
                                        </td>
                                        <td>
                                            <Link href="https://www.linkedin.com/company/onepack"><img src={linkdin} alt="" /></Link>
                                        </td>
                                       
                                    </tr>
                                </tbody>
                            </Table>
                            <div style={{ borderTop: "1px solid #ddd", margin: "20px auto 0" }}></div>
                            
                        </td>
                    </tr>
                </tbody>
            </Table>
    

        <style global jsx>{`
            body {
                text-align: center;
                margin: 0 auto;
                width: 650px;
                font-family: 'Open Sans', sans-serif;
                background-color: #e2e2e2;
                display: block;
            }
    
            ul {
                margin: 0;
                padding: 0;
            }
    
            li {
                display: inline-block;
                text-decoration: unset;
            }
    
            a {
                text-decoration: none;
            }
    
            p {
                margin: 15px 0;
                color: #000;
            }
    
            h5 {
                color: #444;
                text-align: left;
                font-weight: 400;
            }
    
            .text-center {
                text-align: center
            }
    
            .main-bg-light {
                background-color: #fafafa;
            }
    
            .title {
                color: #444444;
                font-size: 22px;
                font-weight: bold;
                margin-top: 10px;
                margin-bottom: 10px;
                padding-bottom: 0;
                text-transform: uppercase;
                display: inline-block;
                line-height: 1;
            }
    
            table {
                margin-top: 30px
            }
    
            table.top-0 {
                margin-top: 0;
            }
    
            table.order-detail {
                border: 1px solid #ddd;
                border-collapse: collapse;
            }
    
            table.order-detail tr:nth-child(even) {
                border-top: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
            }
    
            table.order-detail tr:nth-child(odd) {
                border-bottom: 1px solid #ddd;
            }
    
            .pad-left-right-space {
                border: unset !important;
            }
    
            .pad-left-right-space td {
                padding: 5px 15px;
            }
    
            .pad-left-right-space td p {
                margin: 0;
            }
    
            .pad-left-right-space td b {
                font-size: 15px;
                font-family: 'Roboto', sans-serif;
            }
    
            .order-detail th {
                font-size: 16px;
                padding: 15px;
                text-align: center;
                background: #fafafa;
            }
    
            .footer-social-icon tr td img {
                margin-left: 5px;
                margin-right: 5px;
            }
        `}
        </style>
        </div>
    )

}
export default OrderSuccess2;