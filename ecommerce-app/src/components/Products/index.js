import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { fetchProductsStart } from '../../redux/Products/products.action'
import Product from './Product'
import FormSelect from '../Forms/FormSelect'
import LoadMore from '../LoadMore'
import './style.scss'

const mapState = ({productsData}) => ({
   products: productsData.products
})

function ProductResults() {
   const dispatch = useDispatch();
   const history = useNavigate();
   const { filterType } = useParams();
   const { products } = useSelector(mapState)

   useEffect(() => {
     dispatch(fetchProductsStart({ filterType }))
   }, [filterType])

   const handleFilter = (e) =>{
      const nextFilter = e.target.value
      history(`/search/${nextFilter}`)
   }

   if(!Array.isArray(products)) return null;

   if (products.length < 1) {
      return (
      <div className='products'>
         <p>
           No search results. 
         </p>
      </div>
      )
   }

   const configFilters = {
    defaultValue: filterType,
     options: [
       {
         name: 'show all',
         value: '',
       },
       {
         name: 'Mens',
         value: 'mens',
       },
       {
         name: 'Womens',
         value: 'womens',
       },
     ],
     handleChange: handleFilter,
   }

   const handleLoadMore = () =>{

   }
   const configLoadMore = {
    onLoadMoreEvt: handleLoadMore
   }

   return (
     <div className='products'>
       <h1>Browse Products</h1>

       <FormSelect {...configFilters} />

       <div className='productResults'>
         {products.map((product, pos) => {
           const { productThumbnail, productName, productPrice } = product
           if (
             !productThumbnail ||
             !productName ||
             typeof productPrice === 'undefined'
           ) {
             return null
           }

           const configProduct = {
              ...product
           }
           return <Product {...configProduct} />
         })}
       </div>
       <LoadMore {...configLoadMore} />
     </div>
   )
}

export default ProductResults