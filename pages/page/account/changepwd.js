import React,{useState,useContext} from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Form, Label, Input ,Col, Toast} from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useForm } from '../../../util/hooks';
import {useRouter} from 'next/router';
import { withApollo } from '../../../helpers/apollo/apollo';
import {AuthContext} from '../../../context/auth';


function Login (props)  {
    const {user}= useContext(AuthContext)
    
   const [pwd,setPwd]= useState('')
   const [newpwd,setNewpwd]= useState('')
   const [cnewpwd,setCnewpwd]= useState('')
   const [message,setmessage]= useState('')


const handlesubmit = e => {
    e.preventDefault();
}

function changepwd (){
    if(pwd){ //user.password isnt fetching the password from DB 
        setmessage("correct password")

    } else {
        setmessage("Password do not match")
    }
}     
    
    return (
        <CommonLayout parent="home" title="login">
            <section className="login-page section-b-space">
                <Container className="login-box">
                    <Row>
                        <Col lg="6">
                            <h3>Change password</h3>
                            <div className="theme-card">
                                <Form  noValidate className="theme-form" onSubmit={handlesubmit}>
                                    
                                    <div className="form-group">
                                        <Label for="review"> ancien mot de passe</Label>
                                        <Input type="password" className="form-control"  
                                        type="password"
                                        value={pwd}
                                        
                                        onChange={e => setPwd(e.target.value)} 
                                            placeholder="Entrez votre mot de passe" required="" />
                                            <div className="form-group">
                                        <Label for="review">New password</Label>
                                        <Input type="password" className="form-control" 
                                        
                                        type="password"
                                        value={newpwd}
                                        onChange={e => setNewpwd(e.target.value)} 
                                            placeholder="entrez votre nouveau mot de passe" required="" />
                                            <p>
                                                {message}
                                            </p>
                                    </div>
                                    <div className="form-group">
                                        <Label for="review">Confirmer nouveau mot de passe</Label>
                                        <Input type="password" className="form-control" 
                                        type="password"
                                        value={cnewpwd}
                                        onChange={e => setCnewpwd(e.target.value)} 
                                            placeholder="Confirmez votre mot de passe" required="" />
                                    </div>
                                    
                                    </div>
                                    <button type="submit" className="btn btn-solid" onClick={changepwd}> Confirmer</button>
                                    
                                </Form>
            


                                <hr></hr>
                           
                            </div>
                        </Col>
                        
                        
                    </Row>
                    
                    
                </Container>
                
            </section>
        </CommonLayout>
    )
}

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      firstName
      lastName
      token
    }
  }
`;

export default withApollo(Login);
