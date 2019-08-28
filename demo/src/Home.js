import React from "react";
import "./Home.css";
import { Button, Col, Row } from "antd";

const Home = props => {
  return (
    <div className="disclaimer">
      <Row>
        <Col>Welcome to one HTML to React Parser!</Col>
      </Row>
      <Row>
        <Button onClick={() => props.history.push("/parse")}>Parse!</Button>
      </Row>
    </div>
  );
};

export default Home;
