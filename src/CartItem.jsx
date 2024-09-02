import React from 'react';
import './CartItem.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice'; // Adjust the import path as needed

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  
  const parseCost = (costStr) => {
    
    console.log(`Parsing cost: ${costStr}`);
    return parseFloat(costStr.replace('$', ''));
  };

  
  const calculateTotalAmount = (items = []) => {
    return items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  
  const calculateTotalCost = (items = []) => {
    return items.reduce((total, item) => {
     
        
      const cost = parseCost(item.cost);
      console.log(`Item cost: ${cost}, Quantity: ${item.quantity}`);
      return total + (item.quantity * cost);
    }, 0);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  if (!cart) {
    return <div>Loading...</div>;
  }

  if (cart.length === 0) {
    return <div>Your cart is empty</div>;
  }

  const totalAmount = calculateTotalAmount(cart);
  const totalCost = calculateTotalCost(cart);


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${totalCost.toFixed(2)}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${parseCost(item.cost).toFixed(2)}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${(item.quantity * parseCost(item.cost)).toFixed(2)}</div>
              <button className="cart-item-button cart-item-button-remove" onClick={() => handleRemove(item)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleContinueShopping}>Continue Shopping</button>
    </div>
  );
};

export default CartItem;
