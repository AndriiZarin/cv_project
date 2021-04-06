import { useState } from "react";
import { Icon, Button, Table, Input, Container } from "semantic-ui-react";

const initEducation = {
  school: "",
  field: "",
  startYear: "",
  endYear: "",
};

const EducationForm = ({ data, setData }) => {
  const [cource, setCource] = useState(initEducation);

  const addCource = () => {
    if (disabled) return;
    setData({ ...data, cources: [...data.cources, cource] });
    setCource(initEducation);
  };

  const edit = (j) => {
    let newCources = data.cources.filter(
      (v) => v.school !== j.school && v.field !== j.field
    );
    setData({ ...data, cources: newCources });
    setCource(j);
  };

  const deleteCource = (j) => {
    let newCources = data.cources.filter(
      (v) => v.school !== j.school && v.field !== j.field
    );
    setData({ ...data, cources: newCources });
  };

  const disabled =
    cource.school === "" ||
    cource.field === "" ||
    cource.startYear === "" ||
    cource.endYearr === ""
      ? true
      : false;
  return (
    <Container>
      Education & Cources
      <Table stackable columns="5" fixed={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>School</Table.HeaderCell>
            <Table.HeaderCell>Field of study</Table.HeaderCell>
            <Table.HeaderCell>Start Date</Table.HeaderCell>
            <Table.HeaderCell>End Date</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.cources.map((j, index) => (
            <Table.Row key={index}>
              <Table.Cell>{j.school}</Table.Cell>
              <Table.Cell>{j.field}</Table.Cell>
              <Table.Cell>{j.startYear}</Table.Cell>
              <Table.Cell>{j.endYear}</Table.Cell>
              <Table.Cell>
                <Button.Group compact floated="right">
                  <Button
                    basic
                    color="grey"
                    type="button"
                    onClick={() => edit(j)}
                    content="Edit"
                  />
                  <Button
                    basic
                    color="red"
                    type="button"
                    content="Delete"
                    onClick={() => deleteCource(j)}
                  />
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row>
            <Table.Cell>
              <Input
                value={cource.school}
                onChange={(e) =>
                  setCource({ ...cource, school: e.target.value })
                }
                type="text"
                name="school"
                id="school"
                placeholder="school"
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                value={cource.field}
                onChange={(e) =>
                  setCource({ ...cource, field: e.target.value })
                }
                type="text"
                name="field"
                id="field"
                placeholder="field"
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                value={cource.startYear}
                onChange={(e) =>
                  setCource({ ...cource, startYear: e.target.value })
                }
                type="date"
                name="startYear"
                id="startYear"
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                value={cource.endYear}
                onChange={(e) =>
                  setCource({ ...cource, endYear: e.target.value })
                }
                type="date"
                name="endYear"
                id="endYear"
              />
            </Table.Cell>
            <Table.Cell>
              <Button
                compact
                basic
                type="button"
                color={!disabled ? "green" : null}
                disabled={disabled}
                className="mt-1"
                onClick={addCource}
                fluid
              >
                <Icon className="plus" />
                Add
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};

export default EducationForm;
