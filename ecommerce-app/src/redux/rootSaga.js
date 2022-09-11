import { all, call } from 'redux-saga/effects'

import productSagas from './Products/products.sagas'

export default function* rootSaga() {
  yield all([call(productSagas)])
}
