import { useState } from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/es/lib/isEmail";
import equals from "validator/es/lib/equals";
import FormMessage from "../../../components/FormMessage";
import { Button } from "semantic-ui-react";

const initialData = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

const SignupForm = ({ submit }) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = (data) => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Email is wrong";
    if (!data.password) errors.password = "Password cannot be blank";
    if (!equals(data.password, data.passwordConfirmation))
      errors.passwordConfirmation =
        "Password is not equals to password confirmation";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(data);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      submit(data)
        .then(setLoading(false))
        .catch((error) => {
          setErrors(error.response.data.errors);
          setLoading(false);
        });
    }
  };

  const cls = loading ? "ui container form loading" : "ui container form";
  return (
    <form className={cls} onSubmit={handleSubmit}>
      <div className={errors.email ? "error field" : "field"}>
        <label htmlFor="email">Email</label>
        <input
          value={data.email}
          onChange={handleChange}
          type="text"
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
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        {errors.password && <FormMessage>{errors.password}</FormMessage>}
      </div>

      <div className={errors.passwordConfirmation ? "error field" : "field"}>
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          value={data.passwordConfirmation}
          onChange={handleChange}
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder="password confirmation"
        />
        {errors.passwordConfirmation && (
          <FormMessage>{errors.passwordConfirmation}</FormMessage>
        )}
      </div>
      <Button.Group fluid>
        <Button positive>Singup</Button>
        <Button.Or />
        <Button as={Link} to={"/"}>
          Cancel
        </Button>
      </Button.Group>
    </form>
  );
};

export default SignupForm;
