import GridComponent from "@/components/Grid"; // Importando o GridComponent
import Main from "components/Main";
import { Api } from "helper/Api";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Index() {
  return (
    <Main>
      <h1 style={styles.title}>Usuários</h1>
      <UsersGrid />
    </Main>
  );
}

const UsersGrid = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const usersData = await Api.get("users");
        setData(usersData.data);
      } catch (error) {
        toast.error("Erro ao buscar dados de usuários", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const onDelete = (rowData) => {
    Api.delete(`users/${rowData.id}`)
      .then(() => {
        setData(data.filter((user) => user.id !== rowData.id));
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao tentar excluir o usuário.");
      });
  };

  const columns = [
    { field: "id", header: "ID", sortable: true },
    { field: "name", header: "Nome", sortable: true },
    { field: "email", header: "Email", sortable: true },
  ];

  return (
    <div className="container">
      {loading ? (
        <div style={styles.loadingMessage}>Por favor, aguarde...</div>
      ) : (
        <GridComponent
          data={data}
          loading={loading}
          columns={columns}
          onDelete={onDelete}
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
