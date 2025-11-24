import styles from "./ErrorFallback.module.css";

type ErrorFallbackProps = {
  error: Error | null;
  onRetry: () => void;
};

function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Something went wrong 🤷‍♀️</h1>
        {error && <p className={styles.paragraph}>{error.message}</p>}
        <button onClick={onRetry} className={styles.button}>
          Try again
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
