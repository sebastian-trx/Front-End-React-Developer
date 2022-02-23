import styles from "./Form.module.css";
import { useState } from "react";
import Message from "./Message";

export default function Form({ aerolinea }) {
  const [input, setInput] = useState({
    name: "",
    email: "",
    celular: "",
    edad: "",
  });

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState(false)

  // función para manejar los campos del formulario en los respectivos estados
  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  //función para validar los campos del formulario
  function validate(input) {
    let validation = {};
    let check =
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;

    if (!input.name) {
      validation.name = "Este campo es obligatorio";
    } else if (!check.test(input.name)) {
      validation.name = "El nombre solo puede llevar letras";
    }

    if (!input.email) {
      validation.email = "Este campo es obligatorio";
    }

    if (!input.celular) {
      validation.celular = "Este campo es obligatorio";
    } else if (input.celular.toString().length !== 10) {
      validation.celular = "introduce un numero de celular valido";
    }

    if (!input.edad) {
      validation.edad = "Este campo es obligatorio";
    } else if (input.edad > 100 || input.edad < 18) {
      validation.edad = "rango de edad de: 18 a 100 años";
    } else if (Object.entries(validation).length === 0) {
      validation.button = (
        <button className={styles.form_button} type="submit">
          Enviar
        </button>
      );
      validation.flag = true;
    }
    return validation;
  }

  // función para enviar los datos del formulario a la consola
  // mostrar el mensaje de confirmación 
  // limpiar los campos del formulario
  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);

    setMessage(true)
    setTimeout( function () {
        setMessage(false)   
    }, 5000 )

    setInput({
      name: "",
      email: "",
      celular: "",
      edad: "",
    });
    errors.flag = false; 
  }

  return (
      <>
    <div className={styles.form_container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p>
          “Hola, bienvenido, sabemos que quieres viajar en{" "}
          <strong>{aerolinea}</strong>, por favor diligencia el siguiente
          formulario:
        </p>
        <input
          type="text"
          placeholder="nombre completo*"
          name="name"
          value={input.name}
          onChange={handleInput}
        />
        {errors.name && <p>{errors.name}</p>}
        <input
          type="email"
          placeholder="Email*"
          name="email"
          value={input.email}
          onChange={handleInput}
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="number"
          placeholder="Celular*"
          name="celular"
          value={input.celular}
          onChange={handleInput}
        />
        {errors.celular && <p>{errors.celular}</p>}
        <input
          type="number"
          placeholder="Edad*"
          name="edad"
          value={input.edad}
          onChange={handleInput}
        />
        {errors.edad && <p>{errors.edad}</p>}
        {errors.flag && errors.flag ?  
          errors.button
        : 
          <button className={styles.form_button} disabled> Enviar </button>
        }
      </form>
    </div>
    { 
    message &&
    <Message/>
    }
    </>
  )
}
