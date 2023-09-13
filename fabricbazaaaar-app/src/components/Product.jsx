
import React from 'react'

let dataset = [];
export default function Product({ classtype, id, img, name, price,remove , onClick }) {
    const dataUrl = `data:image/jpg;base64,${img}`;



    const addToCart = (item, event) => {
        event.stopPropagation();
        if(remove){
            removeFromCart(item);
            localStorage.setItem('cart', JSON.stringify(dataset));
            onClick(id);
            return
        }
        else{
        // Check if the product is already in the cart
        const productInCart = dataset.find((cartItem) => cartItem === item);

        if (productInCart) {
            if (window.confirm("Product is already in the cart. Do you want remove")) {
                removeFromCart(item);
                  localStorage.setItem('cart', JSON.stringify(dataset));
            return;
            }
        }
        dataset.push(item)
        localStorage.setItem('cart', JSON.stringify(dataset));
    }
    };

    const removeFromCart = (itemId) => {
        dataset = dataset.filter((item) => item !== itemId);
    };


    return (
        <div className={classtype} onClick={(event => {
            window.location.href = `/product/${id}`
        })}>
            <img src={dataUrl} className="img-1" alt="" />
            <div>
                <h3>{name}</h3>
                <p>{price}</p>
            </div>
            <button className='btn' onClick={(e) => { addToCart(id, e) }}> {remove?<>Remove</>:<>Add Cart</>}</button>
        </div>
    )
}
