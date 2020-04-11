import { createContext } from "react";

const Context = createContext({
  products: [],
  estimatedTotal: 0,
  isEditProduct: false,
  editProductId: null,
});

export default Context;
