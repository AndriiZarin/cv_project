import React from "react";
import { Label, Icon, Container } from "semantic-ui-react";

const ContactsPage = (cv) => {
  const contacts = cv.cv.contacts;
  return (
    <Container>
      {/* <List.Icon name="phone" /> */}
      <Label size="large" color="orange">
        <Icon name="phone" />
        <a href={`tel:${contacts.phone}`}>{contacts.phone}</a>
      </Label>
      <Label size="large" color="orange">
        <Icon name="linkedin" />
        <span>{contacts.in}</span>
      </Label>
      <Label size="large" color="orange">
        <Icon name="mail" />
        <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
      </Label>
    </Container>
  );
};

export default ContactsPage;
