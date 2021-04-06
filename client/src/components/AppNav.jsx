import { memo, useEffect } from "react";
import { Link } from "@reach/router";
import { Menu } from "semantic-ui-react";
import { useLoadCVS } from "../contexts/CvContext";
import { useUserState, useLogout } from "../contexts/UserContext";

const AppNav = () => {
  const user = useUserState();
  // console.log(user);
  const loadCVS = useLoadCVS();
  const isAuth = user.token && user.role;
  const logout = useLogout();
  useEffect(() => {
    loadCVS();
  }, [loadCVS]);
  return (
    <>
      <Menu pointing secondary>
        <Menu.Item as={Link} to="/" icon="home" name="home" />
        {isAuth ? (
          <Menu.Item as={Link} to="cv/new" icon="plus" name="add CV" />
        ) : null}
        <Menu.Menu position="right">
          {isAuth ? (
            <Menu.Item onClick={logout} name="logout" icon="sign-out" />
          ) : (
            <>
              <Menu.Item as={Link} to="/login" name="login" icon="user" />
              <Menu.Item as={Link} to="/signup" name="signup" icon="sign-in" />
            </>
          )}
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default memo(AppNav);
