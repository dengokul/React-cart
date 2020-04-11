import React, { useContext, memo, useState, useEffect } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap";
import Context from "store/context";

const EditProduct = memo(props => {
    const { state, dispatch } = useContext(Context);
    const [thisProduct, setThisProduct] = useState({});
    const [thisQuantity, setThisQuantity] = useState(1);
    const [thisSize, setThisSize] = useState("");

    useEffect(() => {
        if(state.isEditProduct && state.editProductId && state.products.length > 0) {
            const editedproducts = state.products.find(x => x.p_id === state.editProductId)
            setThisProduct(editedproducts);
            setThisQuantity(editedproducts.p_quantity)
            setThisSize(editedproducts.p_selected_size.name)
        }
        // eslint-disable-next-line
    }, [state.isEditProduct]);

    function handleEditProduct() {
        dispatch({ type: "EDIT_PRODUCT", payload: {productId: null} });
    }

    function handleOnChange(e) {
        setThisQuantity(e.target.value)
    }

    function handleSelectChange(e) {
        setThisSize(e.target.value)
    }

    function editSubmit() {
        let sizeObjVal = {}
        if(thisSize) {
            let sizeEIndex = thisProduct.p_available_options.sizes.findIndex(element => element.name === thisSize )
            sizeObjVal = thisProduct.p_available_options.sizes[sizeEIndex];
        }
        dispatch({ type: "UPDATE_PRODUCT_SIZE", payload: {size: sizeObjVal, productId: thisProduct.p_id} });
        dispatch({ type: "UPDATE_PRODUCT_QUANTITY", payload: {quantity: thisQuantity, productId: thisProduct.p_id} });
        handleEditProduct();
    }

    return (
        <Modal isOpen={state.isEditProduct}>
            <ModalHeader toggle={handleEditProduct}></ModalHeader>
            <ModalBody>
            {(thisProduct.p_id) && <div className="row">
                <div className="col-md-6 text-modal">
                    <div className="sidebar_wraper text-center">
                        <h4 className="item-title mbr-fonts-style mbr-text display-5" style={{ textTransform: "uppercase"}}>{thisProduct.p_name}</h4>
                        <div style={{ margin: "15px 0"}}>
                            <span>{thisProduct.c_currency}</span><span style={{ fontSize: "40px"}}>{thisProduct.p_originalprice.toFixed(2)}</span>
                        </div>
                        <div >{thisProduct.p_style}</div>
                        <div>
                            {thisProduct.p_available_options.colors.map((productColor, index) => {
                                return <span key={index} style={{ backgroundColor: productColor.hexcode, padding: "1px 15px", margin: "10px", border: (thisProduct.p_selected_color.name === productColor.name) ? "3px solid #ccc" : "none"}} >{" "}</span>
                            })}
                        </div>
                        <div >Color: {thisProduct.p_selected_color.name}</div>
                        <div className="row mb-2 mt-2">
                            <div className="col md-8">
                                <select value={thisSize} onChange={e => handleSelectChange(e)} className="form-control">
                                    <option value="select">Select size</option>
                                    {thisProduct.p_available_options.sizes.map((productSize, index) => {
                                        return <option key={index} value={productSize.name}>{productSize.name}</option>
                                    })}
                                </select>   
                            </div>
                            <div className="col md-8">
                            <input type="number" className="form-control text-center" value={thisQuantity} style={{width: "50px"}} onChange={(e) => handleOnChange(e)}/>
                            </div>
                        </div>
                        <div className="mbr-section-btn"><button className="btn btn-primary display-7" onClick={editSubmit}>EDIT</button></div>
                    </div>
                </div>
                <div className="col-md-6 image-modal"><img src="http://placehold.it/150x200" alt="" title="" /></div>
            </div>}
            </ModalBody>
        </Modal>
    );
})

export default EditProduct;