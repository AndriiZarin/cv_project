import { navigate } from "@reach/router";
import LoginForm from "../../pages/LoginPage/components/LoginForm";
import api from "../../api";
import { useLogin } from "../../contexts/UserContext";
import { Grid } from "semantic-ui-react";

const LoginPage = () => {
  const login = useLogin();

  const submit = (user) =>
    api.users.login(user).then((token) => {
      login(token);
      navigate("/");
    });

  return (
    <Grid centered>
      <Grid.Column computer={6} mobile={16} tablet={8}>
        <LoginForm submit={submit} />
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
