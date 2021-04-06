import {
  Container,
  Icon,
  Grid,
  Image,
  Header,
  Button,
} from "semantic-ui-react";

const UserInfoPage = (cv) => {
  const data = cv.cv;
  const contacts = data.contacts;
  if (!cv) return;
  return (
    <Grid className="mt-2" centered>
      <Grid.Column width={16}>
        <Grid columns={2} stackable>
          <Grid.Column width={4}>
            <Image
              centered
              src={data.img}
              alt={data.firstName + " " + data.lastName}
              size="medium"
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <Header as="h3">{data.firstName + " " + data.lastName}</Header>
            <Header as="h4" className="mt-0">
              {data.position}
            </Header>
            <Header as="h4" className="my-0">
              Age: {data.age}
            </Header>
            <Header as="h4" className="mt-0">
              City: {data.city}
            </Header>
            <Container>{data.about}</Container>
          </Grid.Column>
        </Grid>
      </Grid.Column>
      <Grid.Row>
        <Button
          animated
          className="mr-2 mt-2"
          color="orange"
          href={`tel:${contacts.phone}`}
        >
          <Button.Content visible>
            <Icon name="phone" />
            {contacts.phone &&
              contacts.phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
          </Button.Content>
          <Button.Content hidden>
            <Icon name="phone" />
            Call
          </Button.Content>
        </Button>
        <Button
          animated
          className="mr-2 mt-2"
          color="linkedin"
          target="_blank"
          href={`${contacts.in}`}
        >
          <Button.Content visible>
            {" "}
            <Icon name="linkedin" />
            LinkedIn
          </Button.Content>
          <Button.Content hidden>
            <Icon name="linkedin" />
            View Profile
          </Button.Content>
        </Button>
        <Button
          animated
          color="google plus"
          href={`mailto:${contacts.email}`}
          className="mt-2"
        >
          <Button.Content visible>
            <Icon name="mail" />
            {contacts.email}
          </Button.Content>
          <Button.Content hidden>
            <Icon name="mail" />
            Send message
          </Button.Content>
        </Button>
      </Grid.Row>
    </Grid>
  );
};

export default UserInfoPage;
