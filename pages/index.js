function PageContent() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <h1>sapo cururu na beira do rio 🐸🐸</h1>
      </div>
      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/vrkDOY5skTw?si=l4pI4sa6iESJe4Ql"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

function Home() {
  return <PageContent />;
}

export default Home;
