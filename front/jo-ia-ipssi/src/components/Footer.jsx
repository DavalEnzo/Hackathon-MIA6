import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer id="footer" className="mt-5 p-4">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} IPSSI,  Tous droits réservés.</p>
          </Col>
          <Col className="text-center">
            <a href="/a-propos" className="text-white m-2">
            À propos
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
