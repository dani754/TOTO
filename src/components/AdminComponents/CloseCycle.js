import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import '../../style.css';
import '../../importStyle.css';

export default function CloseCycle (props){

    const [show, setShow] = useState(props.show);

    return (
        <Row>
            <Col xs={6}>
                <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide>
                    <Toast.Header>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                        />
                        <strong className="mr-auto">NO MORE CHANGES!</strong>
                    </Toast.Header>
                    <Toast.Body>This cycle is now closed for updates</Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}
