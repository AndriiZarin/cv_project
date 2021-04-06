import { lazy, Suspense, useState } from "react";
import { Router } from "@reach/router";
import HomePage from "./pages/HomePage/HomePage";
import { AppContainer } from "./styles/styles";
import { FullSpinner } from "./styles/app";
import AppNav from "./components/AppNav";
import { useUserState } from "./contexts/UserContext";
import { Transition } from "semantic-ui-react";
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const UserTab = lazy(() => import("./pages/UserInfoPage/UserTab"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AddCV = lazy(() => import("./pages/CvPage"));

function App() {
  const [message, setMessage] = useState("");
  const user = useUserState();
  const isAuth = user.token && user.role;
  return (
    <AppContainer>
      <div>
        <Suspense fallback={FullSpinner()}>
          <AppNav isAuth={isAuth} />
          {message && (
            <>
              <Transition visible={true} animation="scale" duration={500}>
                <div className="ui info message">
                  <i onClick={() => setMessage("")} className="close icon" />
                  {message}
                </div>
              </Transition>
            </>
          )}
          <Router>
            <HomePage path="/" />
            <LoginPage path="/login" />
            <SignupPage path="/signup" setMessage={setMessage} />
            <UserTab path="cv/:_id" />
            {isAuth ? (
              <>
                <AddCV path="cv/new" />
                <AddCV path="cv/edit/:_id" />
              </>
            ) : null}

            <PageNotFound default />
          </Router>
        </Suspense>
      </div>
    </AppContainer>
  );
}

export default App;
