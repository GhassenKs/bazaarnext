import React,{useState,useContext} from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Form, Label, Input ,Col, Toast} from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useForm } from '../../../util/hooks';
import {useRouter} from 'next/router';
import { withApollo } from '../../../helpers/apollo/apollo';
import {AuthContext} from '../../../context/auth';
import Link from 'next/link';
import { Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Page404 from '../../../helpers/page404'


function Login (  )  {
  
  const context = useContext(AuthContext)
  const router = useRouter()
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
      email: '',
      password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
      update(_, {data:{login:userData}}) {
          context.login(userData)
          console.log(userData);
          router.push('../../');
      },
      onError(err) {
        setErrors(err.graphQLErrors);
        console.log("there is an error");
       
      },
      variables: values
    });
  
    function loginUserCallback() {
      loginUser();
    }
    
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
    
    const log = initialState.user ?

    <Page404 />
 
     

    : 
    (
      (
        <CommonLayout parent="home" title="login">
              <section className="login-page section-b-space">
                  <Container className="login-box">
                      <Row>
                          <Col lg="6">
                              <h3>Se connecter</h3>
                              <div className="theme-card">
                                  <Form onSubmit={onSubmit} noValidate className="theme-form">
                                      <div className="form-group">
                                          <Label for="email">E-mail</Label>
                                          <Input type="text" className="form-control" id="mail" 
                                          name="email"
                                          type="text"
                                          value={values.email}
                                          error={errors}
                                          onChange={onChange} placeholder="Email" required="" />
                                      </div>
                                      <div className="form-group">
                                          <Label for="review">Mot de passe</Label>
                                          <Input type="password" className="form-control" id="pass" 
                                          name="password"
                                          type="password"
                                          value={values.password}
                                          error={errors.password}
                                          onChange={onChange} 
                                              placeholder="Entrez votre mot de passe" required="" />
                                              {/* <Link href={'/page/account/forgot-pwd'}>Forgot password?</Link> */}
                                      </div>
                                      <button type="submit" className="btn btn-solid">connexion</button>
                                      
                                     
                                      
                                  </Form>
              
  
  
                             
                              </div>
                          </Col>
                          
  
                          <Col>
                          <h3>Nouveau client</h3>
                          <div className="theme-card authentication-right">
                                  <h6 className="title-font">Creer un compte</h6>
                                  <p>Inscrivez-vous pour un compte gratuit dans notre magasin. L'inscription est simple et rapide. Cela vous permet de pouvoir commander dans notre boutique. Pour commencer vos achats, cliquez sur S'inscrire.</p>
                              <Link href={'/page/account/register'}>Créer un compte</Link> 
                             </div> 
                              </Col>
                          
                          
                      </Row>
                      
                      
                  </Container>
                  
              </section>
          </CommonLayout>
      )
    )

  return(log)
}

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      firstName
      lastName
      password
      token
      phone
      city
      address
      zip
    }
  }
`;

export default withApollo(Login);
