import { useState, useRef } from "react";
import {
  Label,
  Button,
  Icon,
  Container,
  Segment,
  Input,
} from "semantic-ui-react";

const SkillsForm = ({ data, setData }) => {
  const [skill, setSkill] = useState("");
  const skillInput = useRef(null);

  const setSkills = () => {
    skillInput.current.focus();
    setData({ ...data, skills: [...data.skills, skill] });
    setSkill("");
  };

  const deleteSkill = (s) => {
    setData({ ...data, skills: data.skills.filter((v) => v !== s) });
  };
  return (
    <Container className="mt-3">
      Skills & Technologies
      <Segment className="mt-3">
        {data.skills.length ? (
          <Segment>
            {data.skills.map((s, index) => (
              <Label size="large" className="mt-1" key={index}>
                {s}
                <Icon
                  color="red"
                  className="ml-4"
                  name="trash"
                  onClick={() => deleteSkill(s)}
                />
              </Label>
            ))}
          </Segment>
        ) : null}

        <Input
          fluid
          ref={skillInput}
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="skill"
          labelPosition="right"
          label={
            <Button
              basic
              type="button"
              color={skill !== "" ? "green" : null}
              disabled={skill === "" ? true : false}
              onClick={setSkills}
            >
              <Icon className="icon plus" /> Add
            </Button>
          }
        />
      </Segment>
    </Container>
  );
};

export default SkillsForm;
