import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { useLoadCVS, useStateCVS } from "../../contexts/CvContext";
import { FullSpinner } from "../../styles/app";
import Message from "../../components/Message";
import { Card, Grid } from "semantic-ui-react";

const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const loadCVS = useLoadCVS();
  const cvs = useStateCVS();
  useEffect(() => {
    function load() {
      loadCVS();
      setLoading(false);
    }
    load();
  }, [loadCVS]);

  if (loading) {
    return <FullSpinner />;
  }
  return (
    <Card.Group
      itemsPerRow={4}
      stackable
      className="mt-3"
      style={{ width: "80vw" }}
    >
      {cvs.length ? (
        cvs.map((cv) => <UserCard key={cv._id} cv={cv} />)
      ) : (
        <Message>There is no CV in our base yet</Message>
      )}
    </Card.Group>
  );
};

export default UsersPage;
