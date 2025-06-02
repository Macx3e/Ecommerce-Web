console.log("🚀 Cargando home.jsx...");

const Home = () => {
  console.log("✅ Renderizando home.jsx...");
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenido a la tienda</h1>
      <p>Explora nuestros productos y realiza compras de manera segura.</p>
      <button style={{ padding: "10px 20px", fontSize: "16px" }}>Ver productos</button>
    </div>
  );
};

console.log("✅ home.jsx cargado correctamente.");
export default Home;
