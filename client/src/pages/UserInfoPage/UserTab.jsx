import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import { Tab } from "semantic-ui-react";
import { FullSpinner } from "../../styles/app.jsx";
import api from "../../api";

const SkillsPage = lazy(() => import("../SkillsPage/SkillsPage"));
const EducationPage = lazy(() => import("../EducationPage/EducationPage"));
const UserInfoPage = lazy(() => import("../UserInfoPage/UserInfoPage"));

const initialData = {
  _id: null,
  img: "",
  firstName: "",
  lastName: "",
  age: 25,
  city: "",
  position: "",
  skills: [],
  jobs: [],
  interests: [],
  cources: [],
  contacts: {},
  about: "",
  role: "",
};

const UserTab = () => {
  const id = window.location.pathname.split("/").pop();
  const [cv, setCV] = useState(initialData);
  const getCV = useCallback(() => {
    api.CV.fetchById(id).then((v) => setCV(v));
  }, [id]);

  useEffect(() => {
    getCV();
  }, [getCV, id]);
  const panes = [
    {
      menuItem: { content: "General", icon: "male", key: "general" },
      render: () => (
        <Tab.Pane attached={false}>
          <UserInfoPage cv={cv} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { content: "Experiance", icon: "book", key: "skills" },
      render: () => (
        <Tab.Pane attached={false}>
          <SkillsPage cv={cv} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        content: "Education",
        icon: "student",
        key: "education",
      },
      render: () => (
        <Tab.Pane attached={false}>
          <EducationPage cv={cv} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      <Suspense fallback={FullSpinner()}>
        <Tab
          style={{ width: "80vw", overflow: "hidden" }}
          menu={{ pointing: true, fluid: true }}
          panes={panes}
          renderActiveOnly={true}
        />
      </Suspense>
    </>
  );
};

export default UserTab;
