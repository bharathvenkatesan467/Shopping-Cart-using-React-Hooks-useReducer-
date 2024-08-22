import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import product1 from './product1.jpg';
import product2 from './product2.jpg';
import product3 from './product3.jpg';
import product4 from './product4.jpg';

const initialState = {
  items: [],
  total: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        items: [...state.items, action.item],
        total: state.total + action.item.price * action.item.quantity
      };
    case 'remove':
      const itemToRemove = state.items.find(item => item.id === action.itemId);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.itemId),
        total: state.total - (itemToRemove.price * itemToRemove.quantity)
      };
    case 'update':
      const updatedItems = state.items.map(item => {
        if (item.id === action.itemId) {
          const updatedItem = { ...item, quantity: action.quantity };
          return updatedItem;
        }
        return item;
      });
      const itemToUpdate = state.items.find(item => item.id === action.itemId);
      const newTotal = state.total + (action.quantity - itemToUpdate.quantity) * itemToUpdate.price;
      return {
        ...state,
        items: updatedItems,
        total: newTotal
      };
    default:
      return state;
  }
};

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddItem = (item) => {
    dispatch({ type: 'add', item });
  };

  const handleRemoveItem = (itemId) => {
    dispatch({ type: 'remove', itemId });
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    dispatch({ type: 'update', itemId, quantity });
  };

  return (
    <div class="b1">
      <h2>Shopping</h2>
      <div class="d1">
        <div class="dd1">
          <img src={product1} class="ip1" alt="prod1" width={"200px"} height={"200px"}></img><br></br>
          <button class="btn1" onClick={() => handleAddItem({ id: 1, name: 'Product 1', price: 1, quantity: 1 })}>
            Add Product 1 to cart
          </button>
        </div>
        <div class="dd2">
          <img src={product2} class="ip1" alt="prod1" width={"200px"} height={"200px"}></img><br></br>
          <button class="btn2" onClick={() => handleAddItem({ id: 2, name: 'Product 2', price: 1, quantity: 1 })}>
            Add Product 2 to cart
          </button>
        </div>
      </div>
      <div class="d2">
      <div class="dd3">
          <img src={product3} class="ip1" alt="prod1" width={"200px"} height={"200px"}></img><br></br>
          <button class="btn1" onClick={() => handleAddItem({ id: 3, name: 'Product 3', price: 1, quantity: 1 })}>
            Add Product 3 to cart
          </button>
        </div>
        <div class="dd4">
          <img src={product4} class="ip1" alt="prod1" width={"200px"} height={"200px"}></img><br></br>
          <button class="btn2" onClick={() => handleAddItem({ id: 4, name: 'Product 4', price: 1, quantity: 1 })}>
            Add Product 4 to cart
          </button>
        </div>
      </div>
      <p>Total Count: {state.total.toFixed()}</p>
      <div>
        <h3>Cart</h3>
        {state.items.map(item => (
          <li key={item.id}>
            {item.name} x {item.quantity} = {item.price * item.quantity}
            <button class="btn2" onClick={() => handleRemoveItem(item.id)}>Remove</button>
            <button class="btn2" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            <button class="btn2" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
          </li>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<ShoppingCart />, document.getElementById('root'));
