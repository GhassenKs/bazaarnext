import React, { useState, useEffect , useContext} from 'react';
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import Cart from '../containers/Cart';
import CartContainer from '../containers/CartContainer';
import TopBarDark from "./common/topbar-dark";
import { Media, Container, Row, Col, Input, Button, Form } from 'reactstrap';
import search from '../../public/assets/images/icon/search.png';
import settings from '../../public/assets/images/icon/setting.png';
import cart from '../../public/assets/images/icon/cart.png';
import Currency from './common/currency';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { createContext } from 'react';
import FilterContext from '../../helpers/filter/FilterContext'
import ProductItem from '../../components/common/product-box/ProductBox1';
import CartContext from '../../helpers/cart';
import {WishlistContext} from '../../helpers/wishlist/WishlistContext';
import { CompareContext } from '../../helpers/Compare/CompareContext';
import {withApollo} from '../../helpers/apollo/apollo'
import { useHistory } from "react-router-dom"
import { Image, Item } from 'semantic-ui-react'


const GET_PRODUCTS = gql`
    query  products($text:String!,$indexFrom:Int! ,$limit:Int!) {
        products (text:$text,indexFrom:$indexFrom ,limit:$limit){
            items {
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
            }
        }
    }
`; 




const HeaderOne = ({  headerClass, topClass, noTopBar ,direction }) => {

	const [isLoading, setIsLoading] = useState(false);
	// eslint-disable-next-line
	const [open, setOpen] = useState(false);
	
	const [url, setUrl] = useState();
	const cartContext = useContext(CartContext);
	const searchcontext = useContext(FilterContext)
    const wishlistContext = useContext(WishlistContext);
    const compareContext = useContext(CompareContext);
	const setSelectedSearch = searchcontext.setSelectedSearch;
	const selectedBrands = searchcontext.selectedBrands;
    const selectedColor = searchcontext.selectedColor;
    const selectedPrice = searchcontext.selectedPrice;
    const selectedCategory = searchcontext.state;
	const selectedSearch = searchcontext.selectedSearch;
    const selectedSize = searchcontext.selectedSize;
    const router = useRouter();
	let history = useHistory();


	
	useEffect(() => {
		setTimeout(function () {
			document.querySelectorAll(".loader-wrapper").style = 'display:none';
		}, 2000);

		setOpen(true)
		if (router.asPath !== '/layouts/Christmas')
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		}


	}, []);
	
	var { loading, data } =  useQuery(GET_PRODUCTS, {
        variables: {
            text: selectedSearch,
            indexFrom: 0,
            limit: 10
        }
    });
  

	const handleScroll = () => {
		let number = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		if (number >= 300) {
			if (window.innerWidth < 576) {
				document.getElementById("sticky").classList.remove('fixed');
			} else
				document.getElementById("sticky").classList.add('fixed');
		} else {
			document.getElementById("sticky").classList.remove('fixed');
		}
	}

	const openNav = () => {
		var openmyslide = document.getElementById("mySidenav");
		if (openmyslide) {
			openmyslide.classList.add('open-side')
		}
	}
	const openSearch = () => {
		document.getElementById("search-overlay").style.display = "block";
		
	}

	const closeSearch = () => {
		document.getElementById("search-overlay").style.display = "none";
	} 

	// eslint-disable-next-line
	const load = () => {
		setIsLoading(true)
		fetch().then(() => {
			// deal with data fetched
			setIsLoading(false)
		})
	};
const updateSearch = (search) => {
	setSelectedSearch(search)

}

	const clickProductDetail = () => {
		
		console.log(selectedSearch)
		localStorage.setItem("SearchQuery",selectedSearch)
		router.push(`/shop/no_sidebar?&category=all&brand=&color=&size=&minPrice=100&maxPrice=500&search=${selectedSearch}`)
		
    }

	



	

	return (
		<div>
			<header id="sticky" className={`sticky ${headerClass}`}>
				<div className="mobile-fix-option"></div>
				{/*Top Header Component*/}
				{noTopBar ?
					'' :
					<TopBarDark topClass={topClass} logoName={'logo.png'} />
				}

				<Container>
					<Row>
						<Col>
							<div className="main-menu">
								<div className="menu-left">
									
									
								</div>
								<div className="menu-right pull-right">
									{/*Top Navigation Bar Component*/}
									<NavBar />

									<div>
										<div className="icon-nav">
											<ul>
												<li className="onhover-div mobile-search">
													<div><Media src={search} onClick={openSearch} className="img-fluid" alt="" />
														<i className="fa fa-search" onClick={openSearch}></i></div>
												</li>
												<Currency icon={settings} />
												{/*Header Cart Component */}
												{
													direction === undefined ?
													<CartContainer layout={direction} icon={cart} />
													:
													<Cart layout={direction} icon={cart} />	
												}
											</ul>
										</div>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</header>
			

			<div id="search-overlay" className="search-overlay">
				<div>
					<span className="closebtn" onClick={closeSearch} title="Close Overlay">×</span>
					<div className="overlay-content">
						<Container>
							<Row>
								<Col>
									<Form onClick={clickProductDetail}>
										<div className="form-group">
											<Input type="text" className="form-control" id="exampleInputPassword1" 
											onChange={(e) => updateSearch(e.target.value)}
											 placeholder="make a wish" />
											<Button className="btn btn-primary" onClick={clickProductDetail}><i className="fa fa-search"></i></Button>
										
										</div>
									</Form>
								</Col>
							</Row>
						</Container>
					</div>
				</div>
			</div>

			
		</div>
	)
}

export default withApollo(HeaderOne);