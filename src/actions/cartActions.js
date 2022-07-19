import { STATES } from 'mongoose'
import { ADD_TO_CART, REMOVE_FROM_CART } from '../types'

// item is current in items,product going to add the cart
export const addToCart = (items, product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice()
  let alreadyExists = false
  cartItems.forEach((x) => {
    if (x._id === product._id) {
      alreadyExists = true
      x.count++
    }
  })
  if (!alreadyExists) {
    cartItems.push({ ...product, count: 1 })
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  })
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x._id !== product._id)
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } })
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}
