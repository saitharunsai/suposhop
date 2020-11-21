import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import './style.css'
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};
class Signup extends Component {
  state = {
    phonenumber:null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    status: "",
    errors: {
      phonenumber:"",
      firstName: "",
      lastName: "",
      email: "",
      password: "",

    },
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "firstName":
        errors.firstName =
          value.length < 2 ? "Full Name must be 5 characters long!" : "";
        break;
      case "lastName":
        errors.fullName =
          value.length < 2 ? "Full Name must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { status, ...newUser } = this.state;
    fetch("http://localhost:5000/auth/Signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          status: res.status,
        });
      })
      .catch(console.log);
    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.handleSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Signup</h1>
              <div className="form-group">
                <label htmlFor="Phonenumber">phonenumber</label>
                <input
                  type="text"
                  className="form-control"
                  name="phonenumber"
                  noValidate
                  placeholder="Enter your mobilenumber"
                  value={this.state.phonenumber}
                  onChange={this.handleChange}
                />
               
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  noValidate
                  placeholder="Enter First Name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
                {errors.firstName.length > 0 && (
                  <span className="error">{errors.firstName}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  noValidate
                  placeholder="Enter Last Name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
                {errors.lastName.length > 0 && (
                  <span className="error">{errors.lastName}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  noValidate
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                {errors.email.length > 0 && (
                  <span className="error">{errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password </label>
                <input
                  type="password"
                  noValidate
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                {errors.password.length > 0 && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <Button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Signup
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
