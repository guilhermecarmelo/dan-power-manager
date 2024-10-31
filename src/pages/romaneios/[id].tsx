import Main from "../../components/Main";
import RegisterForm from "../../components/Romaneio/RegisterForm";

export default function Home() {
  return (
    <Main>
      <h1 style={styles.title}>Romaneio</h1>
      <RegisterForm />
    </Main>
  );
}

const styles = {
  title: {
    fontSize: "4rem",
    color: "#333",
  },
};
