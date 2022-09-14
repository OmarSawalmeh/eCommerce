import React from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router'
import {selectCartItems, selectCartTotal} from './../../redux/Cart/cart.selectors'
import {createStructuredSelector} from 'reselect'
import Button from '../Forms/Button'
import Item from './Item'
import './style.scss'

const mapState = createStructuredSelector({
   cartItems: selectCartItems,
   total: selectCartTotal
})

function Checkout({}) {
  const { cartItems, total } = useSelector(mapState)
  const history = useNavigate()

  const errMsg = 'You have no items in your cart.'

  return (
    <div className='checkout'>
      <h1>Checkout</h1>

      <div className='cart'>
        {cartItems.length > 0 ? (
          <table border='0' cellPadding='0' cellSpacing='0'>
            <tbody>
              <tr>
                <td>
                  <table
                    className='checkoutHeader'
                    border='0'
                    cellPadding='10'
                    cellSpacing='0'
                  >
                    <tbody>
                      <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Remove</th>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table border='0' cellSpacing='0' cellPadding='0'>
                    <tbody>
                      {cartItems.map((item, pos) => {
                        return (
                          <tr key={pos}>
                            <td>
                              <Item {...item} />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table border='0' cellSpacing='0' cellPadding='0'>
                    <tbody>
                      <tr>
                        <td>
                          <table border='0' cellPadding='10' cellSpacing='0'>
                            <tbody>
                              <tr>
                                <td>
                                  <h3>Total: ${total}</h3>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table border='0' cellPadding='10' cellSpacing='0'>
                            <tbody>
                              <tr>
                                <td>
                                  <Button onClick={() => history('/search')}>
                                    Continue Shopping
                                  </Button>
                                </td>
                                <td>
                                  <Button onClick={() => history('/dashboard')}>
                                    Checkout
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className='msg'>{errMsg}</p>
        )}
      </div>
    </div>
  )
}

export default Checkout