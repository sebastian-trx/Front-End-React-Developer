import styles from "./Message.module.css";

export default function Message() {
  return (
    <div className={styles.message_container}>
      <div className={styles.message}>
        <h2>
          Tu información fue enviada con éxito, estaremos en contacto contigo
        </h2>
      </div>
    </div>
  );
}
