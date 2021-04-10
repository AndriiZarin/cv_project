import { Table } from "semantic-ui-react";

const EducationPage = (cv) => {
  const cources = cv.cv.cources;
  return (
    <Table celled unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Company</Table.HeaderCell>
          <Table.HeaderCell>Field of study</Table.HeaderCell>
          <Table.HeaderCell>Start Date</Table.HeaderCell>
          <Table.HeaderCell>End Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {cources.map((c, index) => (
          <Table.Row key={index}>
            <Table.Cell>{c.school}</Table.Cell>
            <Table.Cell>{c.field}</Table.Cell>
            <Table.Cell>{c.startYear}</Table.Cell>
            <Table.Cell>{c.endYear}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default EducationPage;
