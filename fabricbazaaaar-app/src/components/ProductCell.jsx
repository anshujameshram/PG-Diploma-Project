import React,{useState} from "react";
import { deleteProduct } from "../api-client/apiClient";
import  ProductEditForm from "./ProductEditForm.jsx"


export default function ProductCell({ item,onChange }) {
  const dataUrl = `data:image/jpg;base64,${item.img1}`;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        onChange(item.id);
    };
  
  const onDelete = async () => {
    await deleteProduct(item.id);
    onChange(item.id);
}
  return (
    <>
      <div className="row-5">
        <div>{item.id}</div>
        <div>
          <img src={dataUrl} alt="" height="100px" width="100px" />
        </div>
        <div>{item.pname}</div>
        <div>{`${item.category} / ${item.subctegory}`}</div>
        <div className="btn-group-r">
          <button className="btn" onClick={openDialog}>Edit</button>
          <button className="btn" onClick={onDelete}>Delete</button>
        </div>
      </div>
      <div className={`dialog-overlay ${isDialogOpen ? 'display-flex' : ''}`} id="dialogOverlay">
                { isDialogOpen && <ProductEditForm isOpen={isDialogOpen} item={item} onClose={closeDialog} />}
            </div>
    </>
  );
}
