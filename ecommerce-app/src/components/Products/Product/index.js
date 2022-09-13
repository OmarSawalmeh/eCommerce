import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../Forms/Button'
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/Cart/cart.actions';

function Product(product) {
  const dispatch = useDispatch();
  const { documentID, productThumbnail, productName, productPrice } = product;
  if (
    ! documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === 'undefined'
  ) {
    return null
  }

  const configAddToCartBtn = {
   type: 'button'
  }

  const handleAddToCart = (product)=>{
    if(!product) return;
    dispatch(
      addProduct(product)
    )

  }

  return (
    <div className='product'>
      <div className='thumb'>
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>
      <div className='details'>
        <ul>
          <li>
            <Link to={`/product/${documentID}`}>
              <span className='name'>
                <strong> {productName}</strong>
              </span>
            </Link>
          </li>
          <li>
            <span className='price'>${productPrice}</span>
          </li>
          <li>
            <div className='addToCart'>
              <Button {...configAddToCartBtn} onClick={()=> handleAddToCart(product)}>Add to cart</Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Product
