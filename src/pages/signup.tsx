import Auth from "@/components/Auth";
import { setCookie } from "cookies-next";
import { Api } from "helper/Api/";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";
import Input from "../components/Input";

type Inputs = {
  name: string;
  email: string;
  password: string;
  passwordcheck: string;
  otp: string;
};

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<Inputs>();

  useEffect(() => {
    async function getOtp() {
      const { otp } = router.query;
      if (otp) {
        setValue("otp", otp as string);
      }
    }
    getOtp();

    setFocus("name");
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.passwordcheck) {
      toast.error("As senhas não coincidem");
      return;
    }

    try {
      const response = await Api.post("auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        otp: data.otp,
      });

      if (response.data) {
        toast.success("Cadastro efetuado com sucesso", { autoClose: 3000 });
        setCookie("token", response.data.token, { maxAge: 60 * 60 * 24 });
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Erro ao realizar cadastro", {
        autoClose: 3000,
      });
    }
  };

  return (
    <Auth>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Cadastro</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            id="name"
            register={register}
            placeholder="Nome"
            error={errors.name}
            emptyerror="O Nome é obrigatório"
            style={styles.input}
          />
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
          <Input
            type="password"
            id="passwordcheck"
            register={register}
            placeholder="Confirme sua senha"
            error={errors.passwordcheck}
            emptyerror="Confirme sua senha"
            style={styles.input}
          />
          <Input
            type="text"
            id="otp"
            register={register}
            placeholder="Informe o codigo de convite"
            error={errors.otp}
            emptyerror="O codigo de convite é obrigatório"
            style={styles.input}
          />
          <div style={styles.ctaContainer}>
            <ButtonLink caption="Voltar" href="/" style={styles.button} />
            <Button caption="Cadastrar-se" style={styles.button} />
          </div>
        </form>
      </div>
    </Auth>
  );
}

const styles = {
  title: {
    marginBottom: "30px",
    color: "#FFF",

    fontWeight: "600",
  },
  formContainer: {
    padding: "100px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgb(0 0 0 / 30%)",
    backdropFilter: "blur(12px)",
    width: "600px",
  },
  ctaContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "20px",
  },
  input: {
    backgroundColor: "rgb(0 0 0 / 50%)",
    borderColor: "lightgray",
    color: "#FFF",
  },
  button: {
    backgroundColor: "rgb(0 0 0 / 50%)",
  },
};
