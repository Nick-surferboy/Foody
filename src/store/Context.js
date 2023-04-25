import React, { useState } from "react";

const Context = React.createContext({
  cart: [],
  cartTotalAmount: 0,
  meals: [],
  onAddToCart: (item) => {},
  onRemoveFromCart: (id) => {},
  onResetCart: () => {},
});

export const ContextProvider = (props) => {
  // const meals2 = [
  //   {
  //     id: "m1",
  //     name: "Sushi",
  //     description: "Finest fish and veggies",
  //     price: 22.99,
  //     amount: 1,
  //   },
  //   {
  //     id: "m2",
  //     name: "Schnitzel",
  //     description: "A german specialty!",
  //     price: 16.5,
  //     amount: 0,
  //   },
  //   {
  //     id: "m3",
  //     name: "Barbecue Burger",
  //     description: "American, raw, meaty",
  //     price: 12.99,
  //     amount: 0,
  //   },
  //   {
  //     id: "m4",
  //     name: "Green Bowl",
  //     description: "Healthy...and green...",
  //     price: 18.99,
  //     amount: 0,
  //   },
  //   {
  //     id: "m5",
  //     name: "Steack with French Fries",
  //     description: "Juicy",
  //     price: 15.99,
  //     amount: 0,
  //   },
  // ];

  const [cart, setCart] = useState([]);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  const addToCartHandler = (item) => {
    const existingCartItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const existingCartItem = cart[existingCartItemIndex];
    let updatedItem;
    let updatedCart = [...cart];

    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + item.amount,
      };
      updatedCart[existingCartItemIndex] = updatedItem;
    } else {
      updatedCart = cart.concat(item);
    }

    setCartTotalAmount((prev) => {
      return prev + item.price * item.amount;
    });

    setCart(() => {
      return updatedCart;
    });
  };

  const removeFromCartHandler = (itemToRemove) => {
    const existingCartItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === itemToRemove.id
    );
    const existingCartItem = cart[existingCartItemIndex];
    let updatedCart = [...cart];
    let updatedItem;

    setCartTotalAmount((prev) => {
      return prev - existingCartItem.price;
    });

    if (existingCartItem.amount === 1) {
      updatedCart = cart.filter((item) => item.id !== itemToRemove.id);
    } else {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedCart[existingCartItemIndex] = updatedItem;
    }
    setCart(() => {
      return updatedCart;
    });
  };

  const resetCart = () => {
    setCart([]);
    setCartTotalAmount(0);
  };
  return (
    <Context.Provider
      value={{
        myCart: cart,
        myCartTotalAmount: +cartTotalAmount,
        //  availableMeals: meals,
        onAddToCart: addToCartHandler,
        onRemoveFromCart: removeFromCartHandler,
        onResetCart: resetCart,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
