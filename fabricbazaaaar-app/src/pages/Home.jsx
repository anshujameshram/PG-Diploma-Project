import React, { memo,useEffect,useState } from 'react'
import NavBar from '../components/NavBar'
import '../css/style.css'
import SliderComponent from '../components/SliderComponent'
import Product from '../components/Product'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { getNewProducts } from '../api-client/apiClient'


const Home = memo(() => {
  document.title = "fabricBazar.com";

  const navigate = useNavigate();
    const redirectToProducts = () => {
        navigate('/products');
      };

      const [productList, setProductList] = useState(null)
      useEffect(() => {
          fetchData();
        }, []);
      
        const fetchData = async () => {
          try {
            const products = await getNewProducts(); // Fetch products from your API
            setProductList(products);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="heading">
          <h1>Compare Prices Across Sites & Buy From Right One</h1>
        </div>
        <div className='silder-container'>
            <SliderComponent />
        </div>
        
        <div className="product-container">
          <h1>Buy For Now</h1>
          <div className="products-list">
            <div className="cat-card" onClick={()=>{redirectToProducts()}}>
              <img src="img/Men.png" alt="" />
              <h3>Mens</h3>
            </div>
            <div className="cat-card" onClick={()=>{redirectToProducts()}}>
              <img src="img/Women.png" alt="" />
              <h3>Womens</h3>
            </div>
            <div className="cat-card" onClick={()=>{redirectToProducts()}}>
              <img src="img/kids.png" alt="" />
              <h3>Kids</h3>
            </div>
          </div>
          <div className="cart-btn">
            <Link to="/products">Explore More</Link>
          </div>
        </div>

        <div className="product-container my-3">
          <h1>Newly Added</h1>
          <div className="products-list">
          {productList&& productList.slice(0, 4).map(product =>{
             const platformPrices = [
              { platform: "Myntra", price: parseFloat(product.myntra_price) },
              { platform: "Amazon", price: parseFloat(product.amazon_price) },
              { platform: "Flipkart", price: parseFloat(product.flipkart_price) },
              { platform: "AJIO", price: parseFloat(product.ajio_price) },
              { platform: "Meesho", price: parseFloat(product.meesho_price) }
            ];
    
            const lowestPriceObj = platformPrices.reduce((prev, current) =>
              prev.price < current.price ? prev : current
            );
              return(
            <Product classtype="product-cart" key={product.id} id={product.id} img={product.img1} name={product.pname} price= {`Lowest ₹ ${lowestPriceObj.price} at ${lowestPriceObj.platform}`} />

              )
          }
          )}
          
          </div>
          <div className="cart-btn">
            <Link to="/products">Checkout More</Link>
          </div>
        </div>
        <div className="about-container">
        <h3>About Us</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          facilis impedit, nihil corrupti asperiores voluptates, hic commodi
          cupiditate eum eligendi beatae vel quasi nostrum magnam fuga sit quis
          dolor soluta quia minima? Voluptate eos explicabo magnam facere,
          doloremque adipisci, non quae quia atque sint deserunt quam
          reprehenderit quidem! Rem, ipsa.
        </p>
      </div>
      </div>
      <Footer/>
    </>
  )
})

export default Home