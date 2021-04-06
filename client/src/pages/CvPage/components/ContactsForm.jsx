import { useState, useEffect } from "react";
import { Container, Segment, Input, Label, Grid } from "semantic-ui-react";

const ContactsForm = ({ data, setData, userMail }) => {
  const initContacts = {
    email: userMail,
    phone: undefined,
    in: undefined,
  };
  const [cnt, setCnt] = useState(initContacts);
  useEffect(() => {
    if (data.contacts) setCnt(data.contacts);
  }, [data, setData, userMail]);
  return (
    <Container className="mt-3">
      Contacts
      <Segment className="mt-3 mx-0">
        <Grid stackable={true} padded columns="equal">
          <Grid.Row centered className=" mx-0">
            <Grid.Column>
              <Input
                // label="Email"
                // labelPosition="left corner"
                icon="mail"
                size="large"
                value={cnt.email}
                onChange={(e) => setCnt({ ...cnt, email: e.target.value })}
                onBlur={() => setData({ ...data, contacts: cnt })}
                type="email"
                name="email"
                id="email"
                placeholder="user@mail.com"
              />
            </Grid.Column>
            <Grid.Column>
              <Input
                // label="Tel"
                // labelPosition="left corner"
                icon="phone"
                size="large"
                value={cnt.phone}
                onChange={(e) => setCnt({ ...cnt, phone: e.target.value })}
                onBlur={() => setData({ ...data, contacts: cnt })}
                type="text"
                name="phone"
                id="phone"
                placeholder="(555)555-5555"
              />
            </Grid.Column>
            <Grid.Column>
              {/* <Label>LinkedIn</Label> */}
              <Input
                // label="LinkedIn"
                // labelPosition="left corner"
                icon="linkedin"
                size="large"
                value={cnt.in}
                onChange={(e) => setCnt({ ...cnt, in: e.target.value })}
                onBlur={() => setData({ ...data, contacts: cnt })}
                type="text"
                name="in"
                id="in"
                placeholder="LinkedIn profile"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

export default ContactsForm;
