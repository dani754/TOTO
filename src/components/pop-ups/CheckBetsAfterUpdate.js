import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import '../../style.css';
import '../../importStyle.css';

export default function CheckBetsAfterUpdate (props){

    const [show, setShow] = useState(props.show);
    let message = "ההימור עודכן בהצלחה";
    if (!props.complete){
        message= "ההימור עודכן! שים לב, קיימים משחקים שטרם הימרת עליהם"
    }
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
                        <strong className="mr-auto">{message}</strong>
                    </Toast.Header>
                </Toast>
            </Col>
        </Row>
    );
}
