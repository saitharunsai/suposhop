import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./error.css";
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};
class Login extends Component {
  state = {
    phoneNumber: null,
    password: null,
    status: "",
    errors: {
      phoneNumber: "",
      password: "",
    },
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    const { name, value } = e.target;
    let errors = this.state.errors;
    switch (name) {
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
    const { status, ...user } = this.state;
    fetch(`/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "successful") {
          localStorage.setItem("usertoken", response.token);
          this.props.history.push("/profile");
        } else {
          this.setState({
            status: response.status,
          });
        }
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
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="phoneNumber">phoneNumber</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  placeholder="Enter your phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password </label>
                <input
                  type="password"
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

              <Button variant="outline-primary" type="submit">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

 






