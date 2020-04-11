import React from "react";

const Header = () => {
  return (
    <>
      <div className="container">
          <h3>YOUR SHOPPING CART</h3>
          <div style={{ fontSize: "11px"}}>If the cart is completely empty then we shall again add back the products for you</div>
      </div>
    </>
  );
};

export default Header;
