import React from "react";
import {Modal} from "antd";

function ModalComponent(props: any) {
    return (
        <Modal title={props.modalTitle}
               closeIcon={false} centered destroyOnClose={true}
               open={props.displayModal} onOk={props.modalOnOk} onCancel={props.modalOnCancel}
               styles={{mask: {backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}}
        >
            {props.modalContent}
        </Modal>
    );
}

export default ModalComponent;