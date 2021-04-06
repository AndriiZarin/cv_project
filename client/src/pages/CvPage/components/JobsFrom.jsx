import { useState } from "react";
import { Icon, Button, Table, Input, Container } from "semantic-ui-react";

const initJob = {
  company: "",
  position: "",
  startYear: "",
  endYear: "",
};

const JobsFrom = ({ data, setData }) => {
  const [job, setJob] = useState(initJob);

  const addJob = () => {
    if (disabled) return;
    setData({ ...data, jobs: [...data.jobs, job] });
    setJob(initJob);
  };

  const edit = (j) => {
    let newJobs = data.jobs.filter(
      (v) => v.company !== j.company && v.position !== j.position
    );
    setData({ ...data, jobs: newJobs });
    setJob(j);
  };

  const deleteJob = (j) => {
    let newJobs = data.jobs.filter(
      (v) => v.company !== j.company && v.position !== j.position
    );
    setData({ ...data, jobs: newJobs });
  };

  const disabled =
    job.company === "" ||
    job.position === "" ||
    job.startYear === "" ||
    job.endYearr === ""
      ? true
      : false;
  return (
    <Container>
      Previous jobs
      <Table stackable columns="5" fixed={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>Start Date</Table.HeaderCell>
            <Table.HeaderCell>End Date</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.jobs.map((j, index) => (
            <Table.Row key={index}>
              <Table.Cell>{j.company}</Table.Cell>
              <Table.Cell>{j.position}</Table.Cell>
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
                    onClick={() => deleteJob(j)}
                  />
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row>
            <Table.Cell>
              <Input
                value={job.company}
                onChange={(e) => setJob({ ...job, company: e.target.value })}
                type="text"
                name="company"
                id="company"
                placeholder="company"
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                value={job.position}
                onChange={(e) => setJob({ ...job, position: e.target.value })}
                type="text"
                name="position"
                id="position"
                placeholder="position"
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                value={job.startYear}
                onChange={(e) => setJob({ ...job, startYear: e.target.value })}
                type="date"
                name="startYear"
                id="startYear"
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                value={job.endYear}
                onChange={(e) => setJob({ ...job, endYear: e.target.value })}
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
                onClick={addJob}
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

export default JobsFrom;
