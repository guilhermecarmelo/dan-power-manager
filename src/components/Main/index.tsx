import SideBar from "../SideBar";
import styles from "./styles";

const Main = ({ children }) => {
  return (
    <div style={styles.container}>
      <SideBar />
      <main style={styles.main}>{children}</main>
      <footer style={styles.footer}>
        © 2024 Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Main;
