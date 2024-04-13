import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Dropdown, Button } from "react-bootstrap";
import { FaBell, FaRegUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    let findOut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
    return findOut;
  }, []);

  const logoutHandler = () => {
    if (localStorage.removeItem("token")) {
      setIsLogged(false);
    }
    signOut(auth)
      .then(() => {
        console.log("Logged out successfully");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <Navbar className="shadow-lg" bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav>
            <Navbar.Brand href="/">Nodirbek</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Nav>
          <Nav className="gap-5">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <NavDropdown title="Works" id="basic-nav-dropdown">
              <NavDropdown.Item href="/addproducts">Products</NavDropdown.Item>
              <NavDropdown.Item href="/tableproducts">
                Table Products
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/teams">Teams</Nav.Link>
          </Nav>
          <Nav className="gap-3">
            <Dropdown className="w-50">
              <Dropdown.Toggle as={Nav.Link} className="dropdown-toggle">
                <FaBell style={{ fontSize: "1.5rem" }} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="fw-bold">
                <div
                    style={{ cursor: "pointer" }}
                    className="notification-item d-flex gap-1"
                  >
                    <img
                      className="mr-1"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                      width={30}
                      height={30}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                      alt="avatar"
                    />
                    <p className="d-flex gap-2">
                      <span className="fw-bold">Sara Salah</span>
                      {/* <span>Like Your reply on article.</span> */}
                      <span style={{ color: "gray" }}>10h</span>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <div
                    style={{ cursor: "pointer" }}
                    className="notification-item d-flex gap-1"
                  >
                    <img
                      className="mr-1"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                      width={30}
                      height={30}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                      alt="avatar"
                    />
                    <p className="d-flex gap-2">
                      <span className="fw-bold">Sara Salah</span>
                      {/* <span>Like Your reply on article.</span> */}
                      <span style={{ color: "gray" }}>10h</span>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-center fw-bold">
                  <Link to="/notifications" style={{ textDecoration: "none" }}>View all</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle as={Nav.Link} className="dropdown-toggle">
                <FaRegUserCircle style={{ fontSize: "1.7em" }} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="fw-bold" href="/myprofile">
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold" href="/editprofile">
                  Edit Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                {isLogged ? (
                  <Dropdown.Item
                    style={{ color: "red", fontWeight: "bold" }}
                    href="/login"
                    onClick={logoutHandler}
                  >
                    <BiLogOut style={{ fontSize: "1.2em" }} /> LogOut
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item href="/register" className="fw-bold">
                    Register
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default App;
