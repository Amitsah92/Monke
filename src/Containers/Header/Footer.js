import React from 'react'
import './Footer.css';
import {Container,Row,Col} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faPhoneAlt, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLinkedin, faGithub, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return(
        <div className="Footer-bg">
            <Container>
                <Row className="details-row">
                    <Col lg={4} md={12} sm={12} className="col1">
                        <Row className="icon-row-col1">
                            <FontAwesomeIcon color="green" size="lg" icon={faMapMarkedAlt}/>
                            <b>Janakpur-07, Dhanusha, Nepal</b>
                        </Row>
                        <Row className="icon-row-col1">
                            <FontAwesomeIcon color="green" size="lg" icon={faPhoneAlt} className="icon-col-1"/>
                            <b>+977-9819852331</b><br/>
                        </Row>
                        <Row className="icon-row3-col1">
                            <FontAwesomeIcon color="green" size="lg" icon={faEnvelope} className="icon-col-1"/>
                            <b>support@monke.com</b>
                        </Row> 
                    </Col>
                    <Col lg={4} md={12} sm={12} className="col3">
                        <h6>Follow us:</h6>
                        <i><FontAwesomeIcon color="green" size="lg" icon={faFacebook}/></i>
                        <i><FontAwesomeIcon color="green" size="lg" icon={faTwitterSquare}/></i>
                        <i><FontAwesomeIcon color="green" size="lg" icon={faLinkedin}/></i>
                        <i><FontAwesomeIcon color="green" size="lg" icon={faGithub}/></i>
                    </Col>
                    <Col lg={4} md={12} sm={12} className="col2">
                        <Row className="icon-row-col2">
                        <h4>Helful Links</h4>
                        Services<br/>Supports<br/>Terms & Conditions<br/>Privacy Policies<br/>
                        </Row>
                    </Col>
                </Row>
                <Row className="rights-row">
                    &copy;{new Date().getFullYear()} Monke App - All Rights Reserved.
                </Row>
            </Container>
        </div>
    )
}

export default Footer;