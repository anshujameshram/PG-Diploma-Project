import React, { useState,useEffect } from 'react'
import ProductForm from './ProductForm';
import ProductCell from './ProductCell';
import Loader from './Loader';
import { getProductsList } from '../api-client/apiClient';

export default function ProductDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onChangeData, setOnChangeData] = useState(null);
  const [productList, setProductList] = useState([]);


  useEffect(() => {
    fetchData();
}, [isDialogOpen,onChangeData]);

const fetchData = async () => {
    try {
        const prod = await getProductsList();
        setProductList(prod);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      {loading ? <Loader /> : <>
        <div className="top-btn">
          <button className="add-btn" id="add-product" onClick={openDialog}>
            New Product <img src="/img/plus-line-icon.svg" alt="" />
          </button>
        </div>
        <div className="item-list">
          <div className='table-heading'>
            <div>Sr. No.</div>
            <div>Image</div>
            <div>Name</div>
            <div>Category</div>
            <div>Actions</div>
          </div>
          <div className='table-body'>

            {
              
              (productList  )?productList.map((ele) => (<ProductCell key={ele.id} item={ele} onChange={()=>{setOnChangeData(ele.id); setLoading(true)}}/>)):<center>Product Data Not Avalable</center>
            }
          </div>

        </div>
        <div className={`dialog-overlay ${isDialogOpen ? 'display-flex' : ''}`} id="dialogOverlay">
          <ProductForm isOpen={isDialogOpen} onClose={closeDialog} />
        </div>
      </>}
    </>
  )
}
