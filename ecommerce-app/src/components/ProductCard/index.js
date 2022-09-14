import React, {useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {fetchProductStart, setProduct} from './../../redux/Products/products.action'
import {addProduct} from './../../redux/Cart/cart.actions'
import Button from '../Forms/Button'
import './style.scss'

const mapState = state=> ({
  product: state.productsData.product
})
function ProductCard({}) {
  const dispatch = useDispatch();
  const {productID} = useParams();
  const history = useNavigate()
  const {product} = useSelector(mapState);

  const {
    productThumbnail,
    productName,
    productPrice
  } = product

  useEffect(()=>{
    dispatch(
      fetchProductStart(productID)
    )

    return()=>{
      dispatch(
        setProduct({})
      )
    }
  }, [])

  const handleAddToCart = (product) =>{
    if(!product) return
    dispatch(
      addProduct(product)
    )
    history('/cart')
  }

  const configAddToCartBtn = {
    type: 'button'
  }
  return (
    <div className='productCard'>
      <div className='hero'>
        <img src={productThumbnail} />
      </div>
      <div className='productDetails'>
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>
          <li>
            <span>${productPrice}</span>
          </li>
          <li>
            <div className='addToCart'>
              <Button
                {...configAddToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProductCard