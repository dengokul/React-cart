import React, { useEffect, useContext, lazy, Suspense } from "react";
import Context from "store/context";
import productJsonData from "data/product-data.json";

const ProductsList = lazy(() => import("components/products/ProductsList"));
const EditProduct = lazy(() => import("components/products/EditProduct"));

const HomePage = () => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  async function getProducts() {
    if(productJsonData.length > 0) {
      dispatch({ type: "GET_PRODUCTS", payload: productJsonData });
    }
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {state.isEditProduct && <EditProduct />}
      </Suspense>
      <div className="container">
            <div className="row">
                {
                  (state.products.length > 0) ?
                  <ProductsList />
                  : <div className="container py-5 text-center">
                      <h4>Cart is empty.</h4>
                    </div>
                }
            </div>
      </div>
    </>
  );
};

export default HomePage;