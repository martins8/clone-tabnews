import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function Loader() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>Loading...</div>
  );
}

export default function StatusPage() {
  const response = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (response.isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h1>STATUS PAGE</h1>
        <UpdatedAt />
      </div>
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  console.log(data);

  let updatedAtText = "Carregando...";
  const maxConnections = data.dependencies.database.max_connections;
  const openedConnections = data.dependencies.database.opened_connections;
  const version = data.dependencies.database.version;

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <>
      <h2> 🟢 Database </h2>
      <div>Max connections: {maxConnections}</div>
      <div>Opened connections: {openedConnections}</div>
      <div>DB version: {version}</div>
      <div>Última atualização: {updatedAtText}</div>
    </>
  );
}
