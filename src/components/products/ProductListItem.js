import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Context from "store/context";

const ProductListItem = (props) => {
  const { dispatch } = useContext(Context);
  const [thisQuantity, setThisQuantity] = useState(1);
  const { product } = props;

  function removeProduct(productId) {
    dispatch({ type: "REMOVE_PRODUCT", payload: productId });
  }

  function handleOnChange(e, productId) {
    setThisQuantity(e.target.value)
    dispatch({ type: "UPDATE_PRODUCT_QUANTITY", payload: {quantity: e.target.value, productId} });
  }

  function handleEditProduct(productId) {
    dispatch({ type: "EDIT_PRODUCT", payload: {productId} });
  }

  return (
    <tr>
      <td data-th="Product">
        <div className="row">
          <div className="col-sm-2 hidden-xs"><img src="http://placehold.it/100x100" alt="..." className="img-responsive"/></div>
          <div className="col-sm-8 ml-4" style={{ fontSize: "12px"}}>
            <h6 className="nomargin" style={{ textTransform: "uppercase"}}>{product.p_name}</h6>
            <div>Style #: {product.p_style}</div>
            <div>Color: {product.p_selected_color.name}</div>
            <div className="editItem">
            <Link to={"#"} onClick={() => handleEditProduct(product.p_id)}>EDIT</Link> {" | "}
            <Link to={"#"} onClick={() => removeProduct(product.p_id)}>X REMOVE</Link> {" | "}
            <Link to={"#"} onClick={() => null}>SAVE FOR LATER</Link>
            </div>
          </div>
        </div>
      </td>
      <td data-th="Size">{product.p_selected_size.code}</td>
      <td data-th="Quantity">
        <input type="number" className="form-control text-center" value={(product.p_quantity ? product.p_quantity : thisQuantity)} style={{width: "50px"}} onChange={(e) => handleOnChange(e, product.p_id)}/>
      </td>
      <td data-th="Subtotal" className="text-center">{product.p_originalprice}</td>
    </tr>
  );
};

export default ProductListItem;