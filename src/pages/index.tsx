import Grid from "components/Grid";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import Main from "../components/Main";

export default function Home() {
  const [expeditionData, setExpeditionData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});
  const [loading, setLoading] = useState(false);

  // Colunas para o GridComponent
  const columns = [
    { field: "id", header: "ID", sortable: true },
    { field: "cliente", header: "Cliente", sortable: true },
    { field: "status", header: "Status", sortable: true },
    { field: "dataSaida", header: "Data de Saída", sortable: true },
    { field: "pesoTotal", header: "Peso Total (KG)", sortable: true },
  ];

  useEffect(() => {
    setLoading(true);
    // Dados fictícios para o gráfico de linha
    const chart = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Expedição",
          data: [65, 59, 80, 81, 56, 70],
          fill: false,
          borderColor: "#42A5F5",
          backgroundColor: "#42A5F5",
          tension: 0.4,
        },
      ],
    };

    // Dados fictícios para a tabela
    const expedition = [
      {
        id: 1,
        cliente: "Cliente A",
        status: "Entregue",
        dataSaida: "2024-10-01",
        pesoTotal: 500.75,
      },
      {
        id: 2,
        cliente: "Cliente B",
        status: "Em Trânsito",
        dataSaida: "2024-10-10",
        pesoTotal: 300.5,
      },
      {
        id: 3,
        cliente: "Cliente C",
        status: "Pendente",
        dataSaida: "2024-10-15",
        pesoTotal: 700.8,
      },
      {
        id: 4,
        cliente: "Cliente D",
        status: "Entregue",
        dataSaida: "2024-10-05",
        pesoTotal: 450.6,
      },
      {
        id: 5,
        cliente: "Cliente E",
        status: "Em Trânsito",
        dataSaida: "2024-10-12",
        pesoTotal: 600.25,
      },
      {
        id: 6,
        cliente: "Cliente F",
        status: "Entregue",
        dataSaida: "2024-10-20",
        pesoTotal: 520.45,
      },
      {
        id: 7,
        cliente: "Cliente G",
        status: "Pendente",
        dataSaida: "2024-10-22",
        pesoTotal: 430.0,
      },
    ];

    // Calculando os dados para o gráfico de pizza
    const statusCounts = expedition.reduce(
      (acc, { status }) => {
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      { Entregue: 0, "Em Trânsito": 0, Pendente: 0 }
    );

    const pieChart = {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          data: Object.values(statusCounts),
          backgroundColor: ["#42A5F5", "#FFA726", "#66BB6A"],
          hoverBackgroundColor: ["#64B5F6", "#FFB74D", "#81C784"],
        },
      ],
    };

    setExpeditionData(expedition);
    setChartData(chart);
    setPieChartData(pieChart);
    setLoading(false);
  }, []);

  return (
    <Main>
      <h1 style={styles.title}>Dashboard de Expedição</h1>

      {/* Cards com informações principais */}
      <div style={styles.cardContainer}>
        <Card
          title="Cargas Totais"
          style={{ ...styles.card, backgroundColor: "#007bff" }}
        >
          <p className="p-card-text" style={styles.cardText}>
            150 Cargas
          </p>
        </Card>
        <Card
          title="Cargas em Trânsito"
          style={{ ...styles.card, backgroundColor: "#28a745" }}
        >
          <p className="p-card-text" style={styles.cardText}>
            45 Cargas
          </p>
        </Card>
        <Card
          title="Cargas Entregues"
          style={{ ...styles.card, backgroundColor: "#ffc107" }}
        >
          <p className="p-card-text" style={styles.cardText}>
            105 Cargas
          </p>
        </Card>
      </div>

      {/* Gráfico de expedição */}
      <div className="container">
        <Chart
          type="line"
          data={chartData}
          options={styles.chartOptions}
          height="400px"
        />
      </div>

      {/* Tabela usando GridComponent */}
      <div className="container">
        <Grid
          data={expeditionData}
          loading={loading}
          columns={columns}
          search={false}
        />
      </div>

      {/* Gráfico de Pizza - Status */}
      <div style={styles.pieChartContainer} className="container">
        <h2 style={styles.subtitle}>Distribuição de Status das Cargas</h2>
        <Chart type="pie" data={pieChartData} width="80%" height="80%" />
      </div>
    </Main>
  );
}

const styles = {
  title: {
    fontSize: "3rem",
    color: "#333",
    margin: "2rem 0 3rem 0",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "1.5rem",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem",
  },
  card: {
    width: "30%",
    textAlign: "center" as "center",
    color: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
    transition: "transform 0.2s",
  },
  cardText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  chartOptions: {
    plugins: { legend: { display: true, position: "top" } },
    maintainAspectRatio: false,
    responsive: true,
  },
  pieChartContainer: {
    width: "45%",
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
