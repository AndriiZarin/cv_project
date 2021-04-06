import { useState, useEffect } from "react";
import _find from "lodash/find";
import UploadImage from "../../../components/UploadImage";
import setFomrObj from "../../../components/FormUtils";
import { useStateCVS, useSaveCV } from "../../../contexts/CvContext";
import { useUserState } from "../../../contexts/UserContext";
import JobsForm from "./JobsFrom";
import EducationForm from "./EducationForm";
import SkillsForm from "./SkillsForm";
import ContactsForm from "./ContactsForm";
import { navigate, Link } from "@reach/router";
import {
  Button,
  Form,
  Input,
  Grid,
  TextArea,
  Label,
  Container,
} from "semantic-ui-react";
import jwt_decode from "jwt-decode";

const AddCvForm = () => {
  const user = useUserState();
  const decoded = jwt_decode(user.token);
  const userMail = decoded.user.email;
  const initialData = {
    _id: undefined,
    img: "",
    firstName: "",
    lastName: "",
    age: undefined,
    city: "",
    position: "",
    skills: [],
    jobs: [],
    interests: "",
    cources: [],
    contacts: { email: userMail },
    about: "",
    role: "",
  };
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const _id = window.location.pathname.split("/").pop();
  const cvs = useStateCVS();
  const saveCV = useSaveCV();
  const isAuth = user.token && user.role;

  useEffect(() => {
    const cv = _find(cvs, { _id }) || {};
    if (cv.role && cv.role !== user.role) navigate("/");
    if (cv._id && cv._id !== data._id) {
      setData(cv);
      setErrors({});
    }
  }, [_id, cvs, data._id, user.role]);

  const updatePhoto = (img) => {
    setData((data) => ({ ...data, img }));
    setErrors((errors) => ({ ...errors, img: "" }));
  };
  const validate = (data) => {
    const errors = {};
    if (!data.firstName) errors.firstName = "First name cannot be blank";
    if (!data.lastName) errors.lastName = "Last name cannot be blank";
    if (!data.img) errors.img = "Photo cannot be blank";
    if (!data.age) errors.age = "Age cannot be blank";
    if (parseFloat(data.age) <= 0) errors.age = "Error age";
    if (!data.city) errors.city = "City cannot be blank";
    if (!data.position) errors.position = "Position cannot be blank";
    if (data.cources.length === 0)
      errors.cources = "Education field cannot be blank";
    if (data.skills.length < 1) errors.skills = "Skills cannot be blank";
    if (!data.contacts.email) errors.email = "Email cannot be blank";
    if (!data.contacts.phone) errors.phone = "Phone cannot be blank";
    if (!data.about) errors.about = "About  section cannot be blank";
    if (!data.role) errors.role = "role  section cannot be blank";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({ ...data, role: user.role });
    const errors = validate(data);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      saveCV(data)
        .then(() => navigate("/"))
        .catch((err) => {
          setErrors(err.response.data.errors);
          setLoading(false);
        });
    }
  };

  if (!isAuth) {
    navigate("/");
  }

  return (
    <Form
      aria-label="cv-form"
      onSubmit={handleSubmit}
      className={loading ? "loading" : ""}
    >
      <Grid columns={2} stackable>
        <Grid.Row className="mx-0">
          <Grid.Column className="mt-3" width={12}>
            <Form.Group>
              <Form.Field
                width={7}
                control={Input}
                value={data.firstName}
                onChange={setFomrObj(data, setData)}
                label="First name"
                id="firstName"
                name="firstName"
                placeholder="First name"
                error={
                  errors.firstName
                    ? {
                        content: errors.firstName,
                        pointing: "above",
                      }
                    : null
                }
              />
              <Form.Field
                width={7}
                control={Input}
                value={data.lastName}
                onChange={setFomrObj(data, setData)}
                label="Last name"
                placeholder="Last name"
                id="lastName"
                name="lastName"
                error={
                  errors.lastName
                    ? {
                        content: errors.lastName,
                        pointing: "above",
                      }
                    : null
                }
              />
              <Form.Field
                width={2}
                control={Input}
                type="number"
                value={data.age}
                onChange={setFomrObj(data, setData)}
                label="Age"
                name="age"
                id="age"
                placeholder="Age"
                error={
                  errors.age
                    ? {
                        content: errors.age,
                        pointing: "above",
                      }
                    : null
                }
              />
            </Form.Group>

            {/* second row start */}
            <Form.Group>
              <Form.Field
                width={8}
                control={Input}
                value={data.city}
                onChange={setFomrObj(data, setData)}
                label="City"
                name="city"
                id="city"
                placeholder="City"
                error={
                  errors.city
                    ? {
                        content: errors.city,
                        pointing: "above",
                      }
                    : null
                }
              />
              <Form.Field
                width={8}
                control={Input}
                value={data.position}
                onChange={setFomrObj(data, setData)}
                label="Position"
                name="position"
                id="position"
                placeholder="Position"
                error={
                  errors.position
                    ? {
                        content: errors.position,
                        pointing: "above",
                      }
                    : null
                }
              />
              {/* position END */}
            </Form.Group>

            <Form.Group>
              <Form.Field
                width={16}
                style={{ height: "10em" }}
                control={TextArea}
                value={data.about}
                onChange={setFomrObj(data, setData)}
                name="about"
                id="about"
                label="About"
                placeholder="Tell us more about you..."
                error={
                  errors.about
                    ? {
                        content: errors.about,
                        pointing: "above",
                      }
                    : null
                }
              />
            </Form.Group>
          </Grid.Column>
          <Grid.Column width={4} className="mt-3">
            <UploadImage img={data.img} updatePhoto={updatePhoto} />
            {errors.img && (
              <Label pointing basic color="red">
                {errors.img}
              </Label>
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Column width={16}>
          <Grid.Row>
            <JobsForm data={data} setData={setData} />
            {errors.jobs && (
              <Label pointing basic color="red">
                {errors.jobs}
              </Label>
            )}
          </Grid.Row>
          <Grid.Row className="mt-3">
            <EducationForm data={data} setData={setData} />
            {errors.cources && (
              <Label pointing basic color="red" className="ml-3">
                {errors.cources}
              </Label>
            )}
          </Grid.Row>
          <Grid.Row>
            <SkillsForm data={data} setData={setData} />
            {errors.skills && (
              <Label pointing basic color="red" className="ml-3">
                {errors.skills}
              </Label>
            )}
          </Grid.Row>
          <Grid.Row>
            <ContactsForm
              data={data}
              setData={setData}
              errors={errors}
              userMail={userMail}
            />
          </Grid.Row>

          {/* Buttons START */}
          <Container>
            <Button.Group fluid className="mt-3">
              <Button positive>Save</Button>
              <Button.Or />
              <Button as={Link} to={"/"}>
                Cancel
              </Button>
            </Button.Group>
          </Container>
        </Grid.Column>
        {/* Buttons END */}
      </Grid>
    </Form>
  );
};

export default AddCvForm;
