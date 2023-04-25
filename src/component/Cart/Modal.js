import ReactDom from "react-dom";

import classes from "./Modal.module.css";
import Card from "../UI/Card";
import Cart from "./Cart";

const Modal = (props) => {
  const Backdrop = (props) => {
    return <div className={classes.backdrop} />;
  };

  const ModalOverlay = (props) => {
    return (
      <Card className={classes.modal}>
        <Cart  onClose={props.onClose} onOrder={props.onOrder} />
      </Card>
    );
  };

  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDom.createPortal(
        <ModalOverlay onClose={props.onClose} onOrder={props.onOrder} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
