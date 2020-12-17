import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Container } from "@material-ui/core";

const Home = () => {
  const history = useHistory();
  return (
    <Container>
      <div className="home">
        <div>
          <Button onClick={() => history.push("/login")}>Login</Button>
          <Button onClick={() => history.push("/signup")}>Sign Up</Button>
        </div>
      </div>
    </Container>
  );
};

export default Home;
