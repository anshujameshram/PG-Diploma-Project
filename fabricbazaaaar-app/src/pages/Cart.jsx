import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Product from '../components/Product';
import { getProductsList } from '../api-client/apiClient';
import Loader from '../components/Loader';
let dataset = []
export default function Cart() {
  const navigate = useNavigate();
  const [isEmpty, setIsEmpty] = useState(true);
  const [loading, setLoading] = useState(true);
  const [onClick, setonClick] = useState(null);

  const handlUser = () => {
    const user =localStorage.getItem('user') 
  if (!user && user !=='user') {
      navigate(`/login`);
    }
  }

  const handleGetValue = () => {
    let retrievedValue = localStorage.getItem('cart');
    if(retrievedValue){
      dataset = JSON.parse(retrievedValue);
      dataset.length>0? setIsEmpty(false):setIsEmpty(true);
    }
  };

  
  const [productList, setProductList] = useState(null)


  useEffect(() => {
    setLoading(true);
    handlUser();
    handleGetValue();
    fetchData();
  }, [onClick]);

  const fetchData = async () => {
    try {
      const products = await getProductsList();
      setProductList(products.filter((product) => {
        return dataset.includes(product.id)
      }));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  return (
    <>
      <NavBar />
      <>
        {loading ? <Loader /> : isEmpty ? <div><center><h1>Empty</h1></center></div> : <div>
          <div className="product-container my-3" style={{ justifyContent: 'space-between', alignItems: "center" }}>
            <h1>Cart Item</h1>
            <div className="products-list" style={{ width: 'fit-content', }}>
              {productList && productList.slice(0, 4).map(product => {
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
                return (
                  <div key={product.id} style={{ margin:'0 1rem'}}>
                  <Product classtype="product-cart"  id={product.id} img={product.img1} name={product.pname} price={`Lowest ₹ ${lowestPriceObj.price} at ${lowestPriceObj.platform}`} remove={true} onClick={setonClick}/>
                  </div>
                )
              }
              )}

            </div>
          </div>
        </div>}
      </>
    </>
  );
}
