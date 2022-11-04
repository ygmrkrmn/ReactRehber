import React, { useEffect, useState } from "react";
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

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller } from "react-hook-form";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("ismi giriniz!")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Harfleri kullan!"
    ),
  surname: yup
    .string()
    .required("soyadınızı giriniz!")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Harfleri kullan!"
    ),
  age: yup
    .number()
    .typeError("Rakam girmelisiniz")
    .required("Girmek zorundasınız")
    .positive()
    .integer("yaşınızı giriniz!"),

  phone: yup
    .string()
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      "Lütfen Telefon numaranızı giriniz"
    ),
});
const defaultvalues = {
  id: "",
  name: "",
  surname: "",
  age: "",
  phone: "",
};

function Modals({ person, setPerson }) {
  const [modal, setModal] = useState(false);
  const [count, setCount] = useState(0);
  const toggle = () => setModal(!modal);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: defaultvalues,
    resolver: yupResolver(schema),
  });

  //useEffect fonksiyonu React, DOM ile ilgili herhangi bir işlem tamamlandığında çağıracaktır
  useEffect(() => {
    console.log(person);
  }, [person]);
  //ekle butonumun onclikği
  const handleSubmitt = (data) => {
    console.log(data);
    setPerson([
      ...person,
      {
        id: count,
        name: data.name,
        surname: data.surname,
        age: data.age,
        phone: data.phone,
      },
    ]);

    setCount(count + 1);
  };

  const [addFormData, setAddFormData] = useState({
    id: "",
    name: "",
    surname: "",
    age: "",
    phone: "",
  });

  //tekrar kişi eklediğimde modalımın içinin boş gelmesi için
  const deleteModal = () => {
    setAddFormData({ id: "", name: "", surname: "", age: "", phone: "" });
    toggle();
  };

  return (
    <div>
      <center>
        <Button color="danger" onClick={deleteModal}>
          Kişi Ekleyiniz
        </Button>
      </center>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Rehber</ModalHeader>
        <Form onSubmit={handleSubmit((data) => handleSubmitt(data))}>
          <ModalBody>
            <FormGroup>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChange={onChange}
                    placeholder="Lütfen Adınızı Giriniz"
                    onBlur={onBlur}
                    autoComplete="off"
                    value={value}
                    required
                  />
                )}
              />
              <p className="error">{errors.name?.message}</p>
            </FormGroup>
            <FormGroup>
              <Controller
                control={control}
                name="surname"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChange={onChange}
                    placeholder="Lütfen Soyadınızı Giriniz"
                    onBlur={onBlur}
                    autoComplete="off"
                    value={value}
                    required
                  />
                )}
              />
              <p className="error">{errors.surname?.message}</p>
            </FormGroup>
            <FormGroup>
              <Controller
                control={control}
                name="age"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChange={onChange}
                    placeholder="Lütfen Yaşınızı Giriniz"
                    onBlur={onBlur}
                    autoComplete="off"
                    value={value}
                    required
                  />
                )}
              />
              <p className="error">{errors.age?.message}</p>
            </FormGroup>
            <FormGroup>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChange={onChange}
                    placeholder="Lütfen Telefonunuzu Giriniz"
                    onBlur={onBlur}
                    autoComplete="off"
                    value={value}
                    required
                  />
                )}
              />
              <p className="error">{errors.phone?.message}</p>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={toggle}>
              Kapat
            </Button>

            <Button type="submit" color="primary" className="todo-button">
              Ekle
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default Modals;
