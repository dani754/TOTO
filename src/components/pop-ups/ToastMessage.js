import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';

export default function ToastMessage (props){

    const [show, setShow] = useState(props.pop);
    
    return (
        <Row>
            <Col xs={6}>
                <Toast onClose={() => {props.onClose()}} show={show}  >
                <Toast.Header>
            

          </Toast.Header>
          <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
                    <Toast.Body>{props.message}</Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}
