import { BrowserRouter as Router } from "react-router-dom";
import { CvContextProvider } from "./CvContext";
import { UserContextProvider } from "./UserContext";

function AppProviders({ children }) {
  return (
    <UserContextProvider>
      <CvContextProvider>
        <Router>{children}</Router>
      </CvContextProvider>
    </UserContextProvider>
  );
}

export { AppProviders };
