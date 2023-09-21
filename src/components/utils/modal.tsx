import React, { ReactNode } from 'react';
import { Modal as BModal } from 'react-bootstrap';

type Props = {
  title: string;
  children: ReactNode;
  footer: ReactNode;
  size?: "lg" | "sm" | "xl" | undefined;
  onHide: () => void;
}

const Modal = ({ children, footer, title, onHide, size }: Props) => {
  return (
    <BModal show={true} size={size} onHide={onHide}>
      <BModal.Header closeButton className="modal-header">
        <BModal.Title>
          <h5 className="modal-title">{title}</h5>
        </BModal.Title>
      </BModal.Header>

      <BModal.Body>
        {children}
      </BModal.Body>

      <BModal.Footer>
        {footer}
      </BModal.Footer>
    </BModal>
  )
}

export default Modal;