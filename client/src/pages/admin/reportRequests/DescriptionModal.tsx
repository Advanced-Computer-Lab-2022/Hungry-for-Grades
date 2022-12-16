import { Modal } from 'react-bootstrap';

export default function DescriptionModal(props : {description:string, handleClose:()=>void}) {
  return (
    <Modal show onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Description</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props?.description}
      </Modal.Body>
    </Modal>
  )
}
