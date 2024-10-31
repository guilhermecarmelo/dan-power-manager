import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { useState } from "react";

interface ColumnProps {
  field: string;
  header: string;
  sortable: boolean;
}

interface GridComponentProps {
  data: any[];
  loading: boolean;
  columns: ColumnProps[];
  onAdd?: () => void;
  onEdit?: (rowData: any) => void;
  onDelete?: (rowData: any) => void;
  search?: boolean;
}

const Grid: React.FC<GridComponentProps> = ({
  data,
  loading,
  columns,
  onAdd,
  onEdit,
  onDelete,
  search = true,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const actionTemplate = (rowData: any) => (
    <div style={styles.actionButtons}>
      {onEdit && (
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning"
          onClick={() => onEdit(rowData)}
          tooltip="Editar"
        />
      )}
      {onDelete && (
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => {
            if (
              window.confirm(
                `Tem certeza de que deseja excluir o item com ID ${rowData.id}?`
              )
            ) {
              onDelete(rowData);
            }
          }}
          tooltip="Excluir"
        />
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      {(onAdd || search) && (
        <div style={styles.actions}>
          {onAdd && (
            <Button
              label="Incluir"
              icon="pi pi-plus"
              className="p-button-success"
              onClick={onAdd}
              style={styles.button}
            />
          )}
          {search && (
            <span style={styles.searchBar}>
              <i className="pi pi-search" />
              <InputText
                type="search"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setGlobalFilter(e.target.value)
                }
                placeholder="Buscar"
                style={styles.input}
              />
            </span>
          )}
        </div>
      )}

      {loading ? (
        <div style={styles.loadingMessage}>Por favor, aguarde...</div>
      ) : (
        <DataTable
          value={data}
          paginator
          rows={10}
          globalFilter={globalFilter}
          emptyMessage="Nenhum item encontrado"
          style={styles.table}
        >
          {columns.map((col, idx) => (
            <Column
              key={idx}
              field={col.field}
              header={col.header}
              headerStyle={styles.header}
              style={styles.column}
            />
          ))}
          {(onEdit || onDelete) && (
            <Column
              body={actionTemplate}
              header="Ações"
              headerStyle={{
                ...styles.header,
              }}
              alignHeader="center"
            />
          )}
        </DataTable>
      )}
    </div>
  );
};

export default Grid;

const styles = {
  container: {
    width: "100%",
  },
  actions: {
    display: "flex",
    marginBottom: "1rem",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    width: "30%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "5px",
    backgroundColor: "#fff",
    marginLeft: "auto",
  },
  input: {
    padding: "0.5rem",
    border: "none",
    outline: "none",
  },
  loadingMessage: {
    textAlign: "center" as "center",
    fontSize: "1.2rem",
    color: "#555",
    marginTop: "20px",
    fontStyle: "italic",
  },
  table: {
    borderRadius: "8px",
    overflow: "hidden",
  },
  column: {
    padding: "10px",
  },
  button: {
    width: "100px",
    padding: "10px",
    backgroundColor: "#007bff",
    border: "1px solid #007bff",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  header: {
    fontWeight: "bold",
    backgroundColor: "#3d9bff",
    color: "black",
  },
};
