function getEstimatedTotal(products) {
  let estimatedTotalArr = [];
  if(products.length > 0) {
    for(const productsDataObj of products) {
      let thisProdVal = parseInt(productsDataObj.p_originalprice, 10)*parseInt(productsDataObj.p_quantity, 10);
      estimatedTotalArr.push(thisProdVal);
    }
  }
  return estimatedTotalArr.reduce((a, b) => a + b, 0);
}
export default function reducer(state, { type, payload }) {

  switch (type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: payload,
        estimatedTotal: getEstimatedTotal(payload)
      };

    case "PRODUCT_ESTIMATED_TOTAL":
      
      return {
        ...state,
        estimatedTotal: getEstimatedTotal(state.products)
      };

    case "REMOVE_PRODUCT":
      let removeProducts = [...state.products];
      const filteredproducts = removeProducts.filter( (obj) => {
        return obj.p_id !== payload;
      });
      
      return {
        ...state,
        products: filteredproducts,
        estimatedTotal: getEstimatedTotal(filteredproducts)
      };

    case "EDIT_PRODUCT":
      return {
        ...state,
        isEditProduct: !state.isEditProduct,
        editProductId: (state.isEditProduct === false) ? payload.productId : null
      };

    case "UPDATE_PRODUCT_SIZE":
      let updateProductsSize = [...state.products];
      let sizeElementsIndex = state.products.findIndex(element => element.p_id === payload.productId )
      updateProductsSize[sizeElementsIndex] = {...updateProductsSize[sizeElementsIndex], p_selected_size: payload.size}
      return {
        ...state,
        products: updateProductsSize
      };

    case "UPDATE_PRODUCT_QUANTITY":
      let updateProducts = [...state.products];
      let elementsIndex = state.products.findIndex(element => element.p_id === payload.productId )
      updateProducts[elementsIndex] = {...updateProducts[elementsIndex], p_quantity: payload.quantity}
      return {
        ...state,
        products: updateProducts,
        estimatedTotal: getEstimatedTotal(updateProducts)
      };

    default:
      return state;
  }
}
