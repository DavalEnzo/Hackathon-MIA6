import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Head() {
  return (
    <Navbar expand="sm" id="navbar">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="w-100" id="basic-navbar-nav">
          <Nav>
            <Nav.Link className="text-light fw-bold" href="#home">
              Dashboard
            </Nav.Link>
            <Nav.Link className="text-light fw-bold" href="#link">
              Classements
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Head;