import React, { useState } from "react";
import Navi from "./Navi";
import { Container, Row } from "reactstrap";
import Modals from "./Modals";
import Table from "./Table";
import Search from "./Search";

function App() {
  const [person, setPerson] = useState([]);
  const [handleDelete] = useState([]);
  const [search, setSearch] = useState("");
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div>
      <Container>
        <Row>
          <Navi />
        </Row>

        <Row>
          <Modals person={person} setPerson={setPerson} />
          <Search search={search} handleChange={handleChange} />
          <Table
            person={person}
            setPerson={setPerson}
            handleDelete={handleDelete}
            search={search}
            handleChange={handleChange}
          />
        </Row>
      </Container>
    </div>
  );
}

export default App;
