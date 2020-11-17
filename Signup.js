import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

/* eslint-disable */
const nameRE = /^[A-Z]{2,10}$/i;
const passRE = /^[A-Za-z0-9_\.\-\@\#\!\%\^\$]{4}$/;
const emailRE = /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9_\.\-]+)\.([a-zA-Z]{2,5})$/;
const mobileRE = /^[0-9]{10}$/;

function Signup () {
  const [user, setUser] = useState({

    name: "",
    nameErr: "",
    password: "",
    passwordErr: "",
    email: "",
    emailErr: "",
    mobile: "",
    mobileErr: "",
  });
 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setUser((prevData) => {
        return {
          ...prevData,
          nameErr: "",
          emailErr: "",
          passwordErr: "",
          mobileErr: "",
        };
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [user.nameErr, user.emailErr, user.mobileErr, user.passwordErr]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const userValidation = (re, checkUser, err) => {
    if (!re.test(checkUser)) {
      setUser((prevData) => {
        return { ...prevData, [err]: `Input is not valid` };
      });
      return false;
    } else {
      setUser((prevData) => {
        return {
          ...prevData,
          [err]: "",
        };
      });
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      userValidation(nameRE, user.name, "nameErr") &&
      userValidation(passRE, user.password, "passwordErr") &&
      userValidation(emailRE, user.email, "emailErr") &&
      userValidation(mobileRE, user.mobile, "mobileErr")
    ) {
      alert("form submitted");
    }
  };
  return (
      <>
    <div>
         <Button variant="primary" onClick={handleShow}>
        Sign Up
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>SignUp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <form onSubmit={handleSubmit}>
        {user.nameErr && <h5>{user.nameErr}</h5>}

        <input
          type="text"
          value={user.name}
          onChange={(e) => handleChange(e)}
          placeholder="Name"
          name="name"
          className={user.nameErr ? "err" : null}
        />
        {user.passwordErr && <h5>{user.passwordErr}</h5>}

        <input
          type="text"
          value={user.password}
          onChange={(e) => handleChange(e)}
          placeholder="Password"
          name="password"
          className={user.passwordErr ? "err" : null}
        />
        {user.emailErr && <h5>{user.emailErr}</h5>}

        <input
          type="text"
          value={user.email}
          onChange={(e) => handleChange(e)}
          placeholder="Email"
          name="email"
          className={user.emailErr ? "err" : null}
        />
        {user.mobileErr && <h5>{user.mobileErr}</h5>}

        <input
          type="text"
          value={user.mobile}
          onChange={(e) => handleChange(e)}
          placeholder="Mobile"
          name="mobile"
          className={user.mobileErr ? "err" : null}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal.Body>
     
      </Modal>
      
    </div>
    </>
  );
}

export default Signup;