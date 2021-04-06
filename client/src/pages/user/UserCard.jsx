import { useState } from "react";
import {
  Card,
  Icon,
  Button,
  Grid,
  Confirm,
  Container,
} from "semantic-ui-react";
import { Link, navigate } from "@reach/router";
import { useUserState } from "../../contexts/UserContext";
import api from "../../api";

const UserCard = ({ cv }) => {
  let user = useUserState();
  const [open, setOpen] = useState(false);
  const openConfirm = () => setOpen(true);
  const closeConfirm = () => setOpen(false);
  const role = user.role;
  const deleteCV = async () => {
    await api.CV.delete(cv);
  };
  return (
    <Card
      centered
      style={{
        backgroundColor: "#F9F1F1",
        height: "445px",
        maxWidth: "280px",
        minWidth: "280px",
      }}
    >
      <img
        src={cv.img}
        alt={cv.name}
        style={{
          objectFit: "cover",
          height: "200px",
          minHeight: "200px",
          maxWidth: "280px",
          minWidth: "280px",
        }}
      />
      <Card.Content>
        <Card.Header>
          {cv.firstName} {cv.lastName}
        </Card.Header>
        <Card.Meta>
          <span className="date">{cv.position}</span>
        </Card.Meta>
        {role === cv.role ? null : (
          <Card.Description className="about mt-2">
            {cv.about.substring(0, 100) + " ..."}
          </Card.Description>
        )}
      </Card.Content>
      <Card.Content extra>
        <span>
          <Icon name="user" />
          {cv.skills.length} technologies
        </span>
      </Card.Content>
      <Card.Content extra>
        <Grid>
          <Grid.Column textAlign="center" width={16}>
            <Button
              fluid
              compact
              as={Link}
              to={`cv/${cv._id}`}
              basic
              color="green"
              content="View Profile"
              className={role === cv.role ? "" : "mb-3"}
            />
            {role === cv.role ? (
              <>
                {/* first button */}
                <Button.Group fluid compact>
                  <Button
                    animated
                    className="mt-1"
                    color="orange"
                    basic
                    as={Link}
                    to={`cv/edit/${cv._id}`}
                  >
                    <Button.Content hidden>Edit</Button.Content>
                    <Button.Content visible>
                      <Icon name="pencil" />
                    </Button.Content>
                  </Button>
                  {/* second button */}
                  <Button
                    className="mt-1"
                    animated
                    basic
                    color="red"
                    onClick={openConfirm}
                  >
                    <Button.Content hidden>Delete</Button.Content>
                    <Button.Content visible>
                      <Icon name="trash alternate" />
                    </Button.Content>
                  </Button>
                </Button.Group>
                <Confirm
                  open={open}
                  onCancel={closeConfirm}
                  content={
                    <Container className="my-3">
                      This change is permanent
                    </Container>
                  }
                  confirmButton={<Button basic content="DELETE" />}
                  cancelButton={<Button>Cancel</Button>}
                  header="Are you shure"
                  closeOnEscape
                  size="tiny"
                  style={{
                    height: "12rem",
                    textAlign: "center",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                  onConfirm={() => {
                    deleteCV();
                    navigate("/");
                  }}
                />
              </>
            ) : null}
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default UserCard;
