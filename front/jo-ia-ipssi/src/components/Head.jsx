import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import TextHome from "./TextHome";


function Head() {
  return (
    <>
      <Navbar expand="sm" id="navbar" className="bg-body-white">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="w-100" id="basic-navbar-nav">
            <Nav>
              <Nav.Link className="text-light fs-5 fw-bold" href="#home">
                Dashboard
              </Nav.Link>
              <Nav.Link className="text-light fs-5 fw-bold" href="#link">
                Classements
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <TextHome />
    </>
  );
}

export default Head;
