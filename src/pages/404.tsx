import ButtonLink from "@/components/ButtonLink";
import Auth from "components/Auth";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <Auth>
      <div style={styles.container}>
        <h1 style={styles.title}>404 - Página não encontrada</h1>
        <p style={styles.message}>
          A página que você está tentando acessar não existe ou foi removida.
        </p>
        <ButtonLink
          caption="Voltar ao Início"
          href={"/login"}
          style={styles.button}
        />
      </div>
    </Auth>
  );
}

const styles = {
  container: {
    padding: "100px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgb(0 0 0 / 30%)",
    backdropFilter: "blur(12px)",
    width: "600px",
  },

  title: {
    marginBottom: "30px",
    color: "#FFF",
  },
  message: {
    color: "#FFF",
    marginBottom: "30px",
  },
  button: {
    backgroundColor: "rgb(0 0 0 / 50%)",
  },
};
