import React, { useContext } from "react";
import ProductListItem from "components/products/ProductListItem";
import Context from "store/context";

const ProductsList = () => {
  const { state } = useContext(Context);

  return (
    <>
      <div className="container">
            <div className="row">
                {
                  (state.products.length > 0) &&
                  <div  className="container">
                    <table id="cart" className="table table-hover table-condensed">
                              <thead>
                              <tr>
                                <th className="border-0 bg-light">Items</th>
                                <th className="border-0 bg-light">Size</th>
                                <th className="border-0 bg-light">Quantity</th>
                                <th className="border-0 bg-light text-center">Price</th>
                              </tr>
                            </thead>
                            <tbody>
                             { state.products.map((product, index) => { 
                             return <ProductListItem key={index} product={product} /> 
                             })}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan="4" className="hidden-xs text-right"><strong>Total ${state.estimatedTotal.toFixed(2)}</strong></td>
                              </tr>
                              <tr>
                                <td colSpan="3" className="hidden-xs"></td>
                                <td><button className="btn btn-primary btn-block">Checkout <i className="fa fa-angle-right"></i></button></td>
                              </tr>
                            </tfoot>
                          </table>
                  </div>
                }
                
            </div>
      </div>
    </>
  );
};

export default ProductsList;