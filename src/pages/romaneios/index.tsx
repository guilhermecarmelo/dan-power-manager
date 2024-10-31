import Grid from "@/components/Grid";
import Main from "components/Main";
import { Api } from "helper/Api/";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  return (
    <Main>
      <h1 style={styles.title}>Romaneio's</h1>
      <RomaneioGrid />
    </Main>
  );
}

const RomaneioGrid = () => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const romaneioData = await Api.get("romaneios");
        setData(romaneioData.data);
      } catch (error) {
        toast.error("Error fetching romaneio data", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const onEdit = (rowData) => {
    router.push("/romaneios/" + rowData.id);
  };

  const onDelete = (rowData) => {
    Api.delete(`romaneios/${rowData.id}`)
      .then(() => {
        setData(data.filter((item) => item.id !== rowData.id));
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao tentar excluir o item.");
      });
  };

  const onAdd = () => {
    router.push("/romaneios/new");
  };

  const columns = [
    { field: "number", header: "Número", sortable: true },
    { field: "nf", header: "Nota Fiscal", sortable: true },
    { field: "equipament", header: "Equipamento", sortable: true },
    { field: "client", header: "Nome do Cliente", sortable: true },
    { field: "place", header: "Local", sortable: true },
    { field: "date", header: "Data de Saída", sortable: true },
    { field: "status", header: "Status", sortable: true },
  ];

  return (
    <div className="container">
      {loading ? (
        <div style={styles.loadingMessage}>Por favor, aguarde...</div>
      ) : (
        <Grid
          data={data}
          loading={loading}
          columns={columns}
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete} // Função de exclusão
        />
      )}
    </div>
  );
};

const styles = {
  loadingMessage: {
    textAlign: "center" as "center",
    fontSize: "1.2rem",
    color: "#555",
    marginTop: "20px",
    fontStyle: "italic",
  },
  title: {
    fontSize: "4rem",
    color: "#333",
  },
};
