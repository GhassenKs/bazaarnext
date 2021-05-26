import React, { useState, useEffect } from 'react';
import Context from './index';
import gql from 'graphql-tag';
import { useQuery,useMutation } from '@apollo/react-hooks';
import { withApollo } from '../../helpers/apollo/apollo';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

const getLocalCartItems = () => { 
  try {
    const list = localStorage.getItem('cartList');
    if (list === null) {
      return [];
    } else {
      return JSON.parse(list)
    }
  } catch (err) {
    return [];
  }
};


/**/
const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState(getLocalCartItems())
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState('InStock');
  const test = localStorage.getItem('cartList');

   
    //
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
  
  var userID= null;
  if(initialState.user){userID=initialState.user.id}
  

  const { loading,error,  data:orders } =  useQuery(FIND_ORDER, {
    variables: {
        
        id:userID
    }
});
//--------------cart initialization
  if (error) {console.log(error)}
  
  if(test){
    if (JSON.parse(test).length==0) {
      
      if(userID){
        if(orders){
          
         
         
          //
          var i = 0
          var cartOrders= []
          var orderTest= null
          for(i=0;i<orders.findOrder?.items.length;i++){
             orderTest = orders.findOrder?.items[i]
            cartOrders[i]=  { ...orderTest, qty: 1, total: 200 }
            
          }
          //
          localStorage.removeItem("cartList")
          localStorage.setItem("cartList",JSON.stringify(cartOrders))
          console.log("i updated the dcart")

        }

      }

    }}
    //end 

//----------------------------------------

const [addItem, { data:itemsss }] = useMutation(ADD_ITEM);
const [deleteItem, { data:deleted }] = useMutation(DELETE_ITEM);

 

  useEffect(() => {
    const Total = cartItems.reduce((a, b) => +a + +b.total, 0)
    setCartTotal(Total);
    localStorage.setItem('cartList', JSON.stringify(cartItems))
    console.log('here in useeffect')
   
   
  }, [cartItems])

  //console.log('%c res :' + + String.fromCodePoint(0x1F480), ' color: #000000;font-weight: bold;font-size:15px');


  
  // Add Product To Cart
  const addToCart = (item ,quantity) => {
    
    if (userID){
      toast.success("Produit ajouté!");

      addItem({

        variables: {
           productId: item._id,
           orderId: orders.findOrder.id
          
         }
        });
        
    const index = cartItems.findIndex(itm => itm.id === item.id)
    if (index !== -1) {
      const product = cartItems[index];
      cartItems[index] = { ...item, ...item, qty: quantity, total:(item.price - (item.price * item.discount / 100)) * quantity };
      setCartItems([...cartItems])
    } else {
      const product = { ...item, qty: quantity, total: (item.price - (item.price * item.discount / 100)) }
      
      console.log(product)
      setCartItems([...cartItems, product])
    }
    }else{
      toast.error("Vous devez vous connecter d'abord");

      
     
    }
    
  }

  const removeFromCart = (item) => {
    if(userID){
      toast.error("Produit supprimé"); 
      deleteItem({

        variables: {
           productId: item._id,
           orderId: orders.findOrder.id
          
         }
        });
      
      setCartItems(cartItems.filter((e) => (e.id !== item.id)))
    }else{
      toast.error("Vous devez vous connecter d'abord"); 
      
    }
      
  }

  const minusQty = () => {
    if (quantity > 1) {
        setQuantity(quantity - 1);
        setStock('En stock')
    }
}

  const plusQty = (item) => {
    if (item.stock >= quantity) {
      setQuantity(quantity + 1)
    } else {
      setStock("En rupture de stock")
    }
  }

   // Update Product Quantity
   const updateQty = (item, quantity) => {
    if(quantity >= 1 ){
      const index = cartItems.findIndex(itm => itm.id === item.id)
      if(index !== -1){
        const product = cartItems[index];
        cartItems[index] = { ...product, ...item, qty: quantity, total: item.price * quantity  }; 

        setCartItems([...cartItems])
        toast.info("Quantité de produit ajouté");
      }else{
        const product = {...item, qty: quantity, total: (item.price - (item.price * item.discount / 100)) * quantity }
        setCartItems([...cartItems, product])
        toast.success("Produit ajouté");
      }
    }else{
      toast.error("Entrez une quantité valide");
    }
  }

   const resetcart = () => {
     if(localStorage.getItem('cartList').length==0)
     {console.log('it works')}
   }
  const { value } = props;
  return (
    <Context.Provider
      value={{
        ...props,
        state: cartItems, cartTotal,setQuantity ,quantity,stock,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        plusQty: plusQty,
        minusQty:minusQty,
        updateQty:updateQty,
        resetcart:resetcart
      }}
    >
      {props.children}
    </Context.Provider>
  ); 
}

const GET_ORDERS = gql`
    query getOrders {getOrders{id,items{_id,title},user{id,firstName}}}
`;
const ADD_ITEM= gql`
  mutation createItem($productId: String!, $orderId: String!) {
   createItem(productId:$productId,orderId:$orderId){items{title}}
    
  }
`;  
const DELETE_ITEM= gql`
  mutation createItem($productId: String!, $orderId: String!) {
   deleteItem(productId:$productId,orderId:$orderId){items{title}}
    
  }
`;    

const FIND_ORDER = gql`
    query findOrder($id:String) {findOrder(id:$id){id,user{firstName},items {
                _id
                id
                title
                description
                type
                brand
                category 
                price
                new
                stock
                sale
                discount
                variants{
                    id
                    sku
                    size
                    color
                    image_id
                }
                images{
                    image_id
                    id
                    alt
                    src
                }
            }}}
`;

export default withApollo(CartProvider);