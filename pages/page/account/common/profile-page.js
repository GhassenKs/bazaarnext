import React,{useState,useContext} from 'react';
import { Container, Row, Form, Input, Label, Col } from 'reactstrap';
import jwtDecode from 'jwt-decode';
import Page404 from '../../../404'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useForm} from '../../../../util/hooks'
import {useRouter} from 'next/router';



const ProfilePage = () => {
    const [errors, setErrors] = useState({});
    const router = useRouter()
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
      

      //updateFunction

      
      const { onChange, onSubmit, values } = useForm(updateUserCallback, {
        
        email: '',
        firstName:'',
        lastName:'',
        phone:'',
        city:'',
        address:'',
        zip:''

      });

      const [updateUser,{ data:updatedUser }] = useMutation(UPDATE_USER, {
        update(_, data ) {
            
            console.log(updatedUser.updateUser.token);
            localStorage.setItem("jwtToken",updatedUser.updateUser.token)
            router.push('../account/dashboard');
        },
        onError(err) {
          setErrors(err.graphQLErrors);
          console.log("there is an error");
         
        },
        variables: {
                
            firstName: values.firstName,
           lastName: values.lastName,
           email:values.email,
           phone:values.phone,
           city:values.city,
           address:values.address,
           zip:values.zip 
          
         }
      });

  /**firstName: "ghassen",
                lastName: "geller",
                email:"chandler@bing.com",
                phone:"874",
                city:"oklahoma",
                address:"idk",
                zip:"74888888"

      const [updateUser, { data:updatedUser }] = useMutation(UPDATE_USER);
      console.log(values)
      function updateUserCallback() {
        updateUser({

            variables: {
                
                firstName: values.firstName,
               lastName: values.lastName,
               email:values.email,
               phone:values.phone,
               city:values.city,
               address:values.address,
               zip:values.zip 
              
             }
            });
      }*/
      function updateUserCallback() {
        updateUser();
        
        }




      const profile = initialState.user ? 
    ( 
        <>
        
            <section className="contact-page register-page">
                <Container>
                    <Row>
                        <Col sm="12">
                            
                            <h3>PERSONAL DETAIL</h3>
                            <Form onSubmit={onSubmit} noValidate className="theme-form">
                                <Row>
                                    <Col md="6">
                                        <Label for="name">Prenom</Label>
                                        <Input type="text" className="form-control" id="name" placeholder={initialState.user.firstName}
                                        name="firstName"
                                           value={values.firstName}
                                           error={errors}
                                           onChange={onChange} required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label for="email">Nom</Label>
                                        <Input type="text" className="form-control" id="last-name" placeholder={initialState.user.lastName} 
                                        value={values.lastName}
                                        name="lastName"
                                        error={errors}
                                        onChange={onChange} required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label for="review">Numero de telephone</Label>
                                        <Input type="text" className="form-control" id="review" placeholder={initialState.user.phone}
                                        name="phone"
                                         value={values.phone}
                                         error={errors}
                                         onChange={onChange}   required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label for="email">Email</Label>
                                        <Input type="text" className="form-control" id="email"
                                         name="email"
                                        value={values.email}
                                          error={errors}
                                          onChange={onChange} 
                                          placeholder={initialState.user.email} required="" />
                                    </Col>
                                   
                                </Row>
                                <Row>
                                    
                                    <Col md="6">
                                        <Label for="name">Addresse </Label>
                                        <Input type="text" className="form-control" id="address-two" placeholder={initialState.user.address}
                                         value={values.address}
                                         error={errors}
                                         name="address"
                                         onChange={onChange}   required="" />
                                    </Col>
                                    <Col md="6">
                                        <Label for="zip">Code postale </Label>
                                        <Input type="text" className="form-control" id="zip-code" placeholder={initialState.user.zip}
                                         value={values.zip}
                                         name="zip"
                                         error={errors}
                                         onChange={onChange}   required="" />
                                    </Col>
                                    
                                    <Col md="6">
                                        <Label for="city">Ville </Label>
                                        <Input type="text" className="form-control" id="city" placeholder={initialState.user.city} 
                                        name="city"
                                        value={values.city}
                                        error={errors}
                                        onChange={onChange} required="" />
                                    </Col>
                                    
                                    <div className="col-md-12">
                                        <button className="btn btn-sm btn-solid" type="submit">enregistrer</button>
                                    </div>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    
                </Container>
            </section>
           
            </>
            ) : 
            (
                <Page404 />
            )

            return(profile)
}
const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String!
    $lastName:String!
    $email: String!
    $phone:String
    $city:String
    $address:String
    $zip:String
  
    
  ) {
    updateUser(
        
        firstName: $firstName
        lastName: $lastName
        email: $email
        city: $city
        address:$address
        zip:$zip
        phone: $phone
      
    ){email,token}
    }
    `

export default ProfilePage;