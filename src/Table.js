import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
function Table({ person, setPerson, search, setEditMode }) {
  const [modal, setModal] = useState(false);
  const [AsdId, setAsdId] = useState("");
  const toggle = () => setModal(!modal);

  //buton silme fonksiyonu
  const handleDelete = (id) => {
    setPerson((person) => person.filter((ind) => ind.id !== id));
  };

  const [addFormData, setAddFormData] = useState({
    id: "",
    name: "",
    surname: "",
    age: "",
    phone: "",
  });
  const handleAddFormChange = (e, key) => {
    setAddFormData({ ...addFormData, [key]: e.target.value });
  };
  const updatePerson = () => {
    toggle();
    person.map((obj, ind) => {
      if (obj.id === AsdId) {
        person[ind] = {
          name: addFormData.name,
          surname: addFormData.surname,
          age: addFormData.age,
          phone: addFormData.phone,
          id: obj.id,
        };
        setPerson(person);
      }
    });
  };
  // düzenleyeceğim kişiye tıkladığımda modalın içinde bilgileri gelmesi için kullanıyorum
  const edit = (id) => {
    toggle();
    setAsdId(id);
    person.map((obj, ind) => {
      if (obj.id === id) {
        setAddFormData(obj);
      }
    });
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Rehber</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                name="name"
                placeholder="Lütfen Adınızı Giriniz"
                type="text"
                className="todo-name"
                autoComplete="off"
                value={addFormData.name}
                onChange={(e) => handleAddFormChange(e, "name")}
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="surname"
                placeholder="Lütfen Soyadınızı Giriniz"
                type="text"
                value={addFormData.surname}
                autoComplete="off"
                onChange={(e) => handleAddFormChange(e, "surname")}
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="age"
                placeholder="Lütfen Yaşınızı Giriniz"
                type="number"
                value={addFormData.age}
                autoComplete="off"
                onChange={(e) => handleAddFormChange(e, "age")}
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="phone"
                placeholder="Lütfen Numaranızı Giriniz"
                type="number"
                value={addFormData.phone}
                autoComplete="off"
                onChange={(e) => handleAddFormChange(e, "phone")}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Kapat
          </Button>

          <Button
            type="button"
            onClick={() => updatePerson()}
            color="primary"
            className="todo-button"
          >
            Düzenle
          </Button>
        </ModalFooter>
      </Modal>

      <table className="table table-danger">
        <thead>
          <tr>
            <th>Adı</th>
            <th>Soyadı</th>
            <th>Tel</th>
            <th>Yaş</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {person
            .filter((val) => val.name.includes(search))
            .map((val, ind) => {
              return (
                <tr key={ind}>
                  <td>{val.name}</td>
                  <td>{val.surname}</td>
                  <td>{val.phone}</td>
                  <td>{val.age}</td>

                  <td>
                    <Button color="danger" onClick={() => handleDelete(ind)}>
                      Sil
                    </Button>
                    <Button color="warning" onClick={() => edit(ind)}>
                      Düzenle
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
