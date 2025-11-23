function ErrorFallback({ error, onRetry }) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4.8rem",
        backgroundColor: "#f9f9f9",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "4.8rem",
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "1.6rem" }}>Something went wrong 🤷‍♀️</h1>
        {error && (
          <p
            style={{
              marginBottom: "3.2rem",
              color: "#777",
              fontFamily: "sans-serif",
            }}
          >
            {error.message}
          </p>
        )}
        <button
          onClick={onRetry}
          style={{
            padding: "1rem 2rem",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
