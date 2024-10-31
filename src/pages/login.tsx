import Auth from "@/components/Auth";
import Button from "components/Button";
import Input from "components/Input";
import Label from "components/Label";
import SolidLine from "components/SolidLine";
import { setCookie } from "cookies-next";
import { Api } from "helper/Api/";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiUserPlus } from "react-icons/bi";
import { toast } from "react-toastify";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await Api.post("auth/login", {
        email: data.email,
        password: data.password,
      });

      if (response.data) {
        toast.success("Login efetuado com sucesso");
        setCookie("token", response.data.token, { maxAge: 60 * 60 * 24 });
        router.push("/");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <Auth>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>
            <span
              className="text-stroke"
              style={{ ...styles.dandan, color: "blue" }}
            >
              Dan
            </span>
            <span
              className="text-stroke"
              style={{ ...styles.dandan, color: "red" }}
            >
              Power
            </span>{" "}
            | Manager
          </h1>
          <h2 style={styles.subtitle}>Inicie a Sessão</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              id="email"
              register={register}
              placeholder="Email"
              error={errors.email}
              emptyerror="O Email é obrigatório"
              style={styles.input}
            />
            <Input
              type="password"
              id="password"
              register={register}
              placeholder="Senha"
              error={errors.password}
              emptyerror="A Senha é obrigatória"
              style={styles.input}
            />
            <Button caption="Entrar" style={styles.button}></Button>
          </form>
          <SolidLine />
          <Label style={styles.label}>
            <span style={{ float: "left", marginRight: "5px" }}>
              Ainda não é cadastrado?
            </span>
            <Link
              href="/signup"
              style={{
                float: "left",
                display: "flex",
                alignItems: "center",
                verticalAlign: "right",
                gap: "5px",
              }}
            >
              Cadastre-se
              <BiUserPlus size={"20px"} />
            </Link>
          </Label>
        </div>
      </Auth>
    </>
  );
}

const styles = {
  title: {
    marginBottom: "10px",
    color: "#FFF",
    fontSize: "35px",
  },
  subtitle: {
    marginBottom: "20px",
    color: "#FFF",
    fontSize: "20px",
  },
  formContainer: {
    padding: "100px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgb(0 0 0 / 30%)",
    backdropFilter: "blur(12px)",
    width: "600px",
  },
  button: {
    width: "100%",
    marginTop: "50px",
    backgroundColor: "rgb(0 0 0 / 50%)",
  },
  input: {
    backgroundColor: "rgb(0 0 0 / 50%)",
    borderColor: "lightgray",
    color: "#FFF",
  },
  label: {
    fontSize: "16px",
  },
  dandan: {},
};
