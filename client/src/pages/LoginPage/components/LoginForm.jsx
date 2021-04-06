import { useState } from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import FormMessage from "../../../components/FormMessage";
import setFormObj from "../../../components/FormUtils";
import { Button } from "semantic-ui-react";

const initialData = {
  email: "",
  password: "",
};

const LoginForm = ({ submit }) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = (data) => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Email not correct";
    if (!data.email) errors.email = "Email can not be blank";
    if (!data.password) errors.password = "Password cannot be blank";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(data);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      submit(data).catch((error) => {
        setErrors(error.response.data.errors);
        setLoading(false);
      });
    }
  };
  const cls = loading ? "ui container form loading" : "ui container form";
  return (
    <>
      <form data-testid="login-form" className={cls} onSubmit={handleSubmit}>
        <div className={errors.email ? "error field" : "field"}>
          <label htmlFor="email">Email</label>
          <input
            value={data.email}
            onChange={setFormObj(data, setData)}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
          {errors.email && <FormMessage>{errors.email}</FormMessage>}
        </div>

        <div className={errors.password ? "error field" : "field"}>
          <label htmlFor="password">Password</label>
          <input
            value={data.password}
            onChange={setFormObj(data, setData)}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          {errors.password && <FormMessage>{errors.password}</FormMessage>}
          {errors.global && <FormMessage>{errors.global}</FormMessage>}
        </div>
        <Button.Group fluid>
          <Button positive>Login</Button>
          <Button.Or />
          <Button as={Link} to={"/"}>
            Cancel
          </Button>
        </Button.Group>
      </form>
    </>
  );
};

export default LoginForm;
