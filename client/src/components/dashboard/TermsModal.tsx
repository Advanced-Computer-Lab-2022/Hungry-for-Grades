import { Modal,Button } from 'react-bootstrap';

import Terms from '@/pages/authentication/signup/Terms&Conditions';




type TermsModalProps = {
  show: boolean;
  handleClose: () => void;
};

function TermsModal({ handleClose, show }: TermsModalProps) {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header >
        <Modal.Title>Terms and Conditions</Modal.Title>
      </Modal.Header>

      <Modal.Body>
	  <div className='row'>
	  <div className='col-12'>{Terms}</div>
	</div>
	      </Modal.Body>
		  <Modal.Footer>
					<Button
					variant='primary'
					onClick={handleClose}
					>
						Accept</Button>

		  </Modal.Footer>
    </Modal>
  );
}

export default TermsModal;
