import { useEffect, useState } from "react";
import API from "../api/axiosConfig";

const TestView = () => {
  const [message, setMessage] = useState("Cargando...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/status"); // Endpoint de prueba del backend
        setMessage(response.data.message);
      } catch (error) {
        setMessage("❌ No se pudo conectar al backend");
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Estado del Backend</h1>
      <p>{message}</p>
    </div>
  );
};

export default TestView;
