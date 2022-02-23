import styles from "./Menu.module.css";
import { IconContext } from "react-icons";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import Form from "./Form";
import { itemList } from "../utils/itemList";

export default function Menu() {
  const [item, setItem] = useState(itemList);
  const [aerolinea, setAerolinea] = useState("(selecciona una aerolinea)");
  const [openClose, setOpenClose] = useState(false);

  // función para "setear" el nombre de la aerolinea seleccionada en el estado aerolinea
  function handleName(name) {
    setAerolinea(name);
  }

  //función para abrir/cerrar el menu en pantallas < 920px
  function handleOpenCloseMenu() {
    setOpenClose(!openClose);
  }

  // de acuerdo al estado "openClose" selecciona un un estilo correspondiente
  let toggle = openClose
    ? styles.menu_items_container
    : styles.menu_items_container_close;

  return (
    <>
      <header className={styles.menu_header}>
        <nav className={styles.menu_nav}>
          <button
            className={styles.menu_mobile_button}
            onClick={handleOpenCloseMenu}
          >
            <IconContext.Provider
              value={{ style: { verticalAlign: "middle" }, size: "10px" }}
            >
              <AiOutlineMenu />
            </IconContext.Provider>
          </button>
          <ul className={styles.menu_items_container + " " + toggle}>
            {item.map((item) => (
              <li
                key={item.id}
                className={styles.menu_item}
                onClick={() => handleName(item.name)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Form aerolinea={aerolinea} />
    </>
  );
}
