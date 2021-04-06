import { Label, Segment, Table } from "semantic-ui-react";

const SkillsPage = (cv) => {
  const data = cv.cv;
  return (
    <>
      Skills & Technologies
      <Segment>
        {data.skills.map((s, index) => (
          <Label className="mt-1" key={index}>
            {s}
          </Label>
        ))}
      </Segment>
      Previous jobs
      <Table unstackable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>Start year</Table.HeaderCell>
            <Table.HeaderCell>End year</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.jobs.map((j, index) => (
            <Table.Row key={index}>
              <Table.Cell data-label="Company">{j.company}</Table.Cell>
              <Table.Cell data-label="Position">{j.position}</Table.Cell>
              <Table.Cell data-label="StartYear">{j.startYear}</Table.Cell>
              <Table.Cell data-label="EndYear">{j.endYear}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default SkillsPage;
