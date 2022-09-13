import {auth} from './../../firebase/utils'
import {takeLatest, put, all, call} from 'redux-saga/effects'
import { setProducts, fetchProductsStart, setProduct } from './products.action'
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct,
  handleFetchProduct
} from './products.helpers'
import productsTypes from './products.types'

export function* addProduct({payload:{
   productCategory,
   productName,
   productThumbnail,
   productPrice,
}}){

   try {
      const timestamp = new Date();
      yield handleAddProduct({
         productCategory,
         productName,
         productThumbnail,
         productPrice,
         productAdminUserUID: auth.currentUser.uid,
         createdDate: timestamp
      })
      yield put(
         fetchProductsStart()
      )
   } catch (error) {
      //console.log(error);
   }
}

export function* onAddProductStart(){
   yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts({payload: {filterType}}){
   try {
      const products = yield handleFetchProducts({filterType});
      yield put(
         setProducts(products)
      )
   } catch (error) {
      //console.log(error)
   }
}

export function* onFetchProductsStart(){
   yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({payload}) {
  try {
   yield handleDeleteProduct(payload);
   yield put(fetchProductsStart());
  } catch (error) {
    //console.log(error)
  }
}

export function* onDeleteProductStart(){
   yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}

export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload)
    yield put(
      setProduct(product)
    )
  } catch (error) {
    //console.log(error)
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct)
}


export default function* productSagas(){
   yield all([
      call(onAddProductStart),
      call(onFetchProductsStart),
      call(onDeleteProductStart),
      call(onFetchProductStart)
   ])
}