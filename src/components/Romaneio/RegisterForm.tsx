import Grid from "components/Grid"; // Importando o componente Grid
import { Api } from "helper/Api/";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import styles from "./RegisterForm.module.css";

function formatDateToInput(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm();

  const [items, setItems] = useState([]);

  const formFields = [
    { label: "Número", field: "number" },
    { label: "Nota Fiscal", field: "nf" },
    { label: "Equipamento", field: "equipament" },
    { label: "Cliente", field: "client" },
    { label: "Local de Carregamento", field: "place" },
    { label: "Data de Saída", field: "date", type: "date" },
  ];

  const itemFields = [
    { field: "item", header: "Item", sortable: true },
    { field: "dimensions", header: "Dimensões", sortable: true },
    { field: "quantity", header: "Quantidade", sortable: true },
    { field: "sku", header: "SKU", sortable: true },
    { field: "material", header: "Material", sortable: true },
    { field: "description", header: "Descrição", sortable: true },
    { field: "productBoxId", header: "Caixa de Produto", sortable: true },
    { field: "weight", header: "Peso", sortable: true },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { id } = router.query;

      if (!id) return;

      if (id === "new") {
        setFocus("numero");
        setIsLoading(false);
        return;
      }

      try {
        const response = await Api.get(`romaneios/${id}`);
        const data = response.data;

        formFields.forEach(({ field }) => {
          const value =
            field === "date" && data[field]
              ? formatDateToInput(data[field])
              : data[field];
          setValue(field, value);
        });

        const itemsWithAutoIncrement = data.products.map((product, index) => ({
          ...product,
          item: index + 1,
          productBoxId: product.productBoxId ? "Sim" : "Não",
        }));

        setItems(itemsWithAutoIncrement || []);
      } catch (error) {
        toast.error("Erro ao buscar dados do romaneio:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router.query]);

  const onRowEditComplete = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.item === updatedItem.item ? updatedItem : item
      )
    );
  };

  const onSubmit = async (formData) => {
    const { id } = router.query;

    // Ajuste a data para o formato ISO, se o campo `date` estiver presente
    if (formData.date) {
      formData.date = new Date(formData.date).toISOString();
    }

    try {
      setIsLoading(true);
      if (id === "new") {
        const response = await Api.post(`romaneios`, formData);
        console.log(response.data);

        // Redireciona para a página do novo romaneio com o ID retornado
        router.push(`/romaneios/${response.data.id}`);
      } else {
        // Atualiza romaneio existente
        await Api.patch("romaneios", { id, ...formData });
        router.push(`/romaneios`);
      }
    } catch (error) {
      toast.error(
        `Erro ao enviar dados: ${
          error.message || error.response?.data?.message
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.formContainer} >
        <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
          {isLoading ? (
            <Skeleton height={340} className={styles.formInput} />
          ) : (
            <>
              {formFields.map(({ label, field, type = "text" }) => (
                <div className={styles.formField} key={field}>
                  <label className={styles.formLabel}>{label}</label>
                  <input
                    type={type}
                    className={styles.formInput}
                    {...register(field, {
                      required: `${label} é obrigatório`,
                    })}
                  />
                  {typeof errors[field]?.message === "string" && (
                    <p className={styles.errorMessage}>
                      {errors[field].message}
                    </p>
                  )}
                </div>
              ))}
            </>
          )}
        </form>
      </div>

      <h2>Itens do romaneio</h2>
      <div className={styles.formContainer}>
        {isLoading ? (
          <Skeleton count={5} height={50} />
        ) : (
          <Grid
            data={items}
            loading={isLoading}
            columns={itemFields}
            search={false}
          />
        )}
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.floatingButton}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Gravar
        </button>
        <Link href="/romaneios" className={styles.floatingButton}>
          Voltar
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
