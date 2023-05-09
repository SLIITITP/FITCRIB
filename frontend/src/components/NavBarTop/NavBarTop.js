import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";

function NavBarTop() {

  const navigate = new useNavigate();
  const MyWorkouts = () => {
    let path = `/MyWorkouts`;
    navigate(path);
  };

  const Home = () => {
    let path = `/`;
    navigate(path);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick = {Home}>FITCRIB</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={MyWorkouts}>Workout Plans</Nav.Link>
            <Nav.Link href="#pricing">Nutrition Plans</Nav.Link>
            <Nav.Link href="#features">MarketPlace</Nav.Link>
            <Nav.Link href="#pricing">Educational Content</Nav.Link>
            <NavDropdown title="Features" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Exercise Databse</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Recipes Database</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Log In</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarTop;