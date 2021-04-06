import SignupForm from "./components/SignupForm";
import { navigate } from "@reach/router";
import api from "../../api";
import { Grid } from "semantic-ui-react";

const SignupPage = ({ setMessage }) => {
  const submit = (user) =>
    api.users.create(user).then(() => {
      setMessage("User has created, please log in");
      setTimeout(function () {
        setMessage(null);
      }, 3000);
      navigate("/login");
    });

  return (
    <Grid centered>
      <Grid.Column computer={6} mobile={16} tablet={8}>
        <SignupForm submit={submit} />
      </Grid.Column>
    </Grid>
  );
};

export default SignupPage;
