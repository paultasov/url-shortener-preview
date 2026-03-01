import { useState } from 'react';
import styles from './App.module.css';
import UrlInput from './components/UrlInput/UrlInput';
import UrlPreview from './components/UrlPreview/UrlPreview';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (url) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.bgOrbs} aria-hidden="true">
        <div className={styles.bgOrb} />
        <div className={styles.bgOrb} />
      </div>

      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.hero}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              URL Shortener &amp; Preview
            </div>
            <h1 className={styles.heroTitle}>
              Short Links.
              <br />
              Smart Preview.
            </h1>
            <p className={styles.heroSubtitle}>Paste a long URL — get a neat short link and site metadata card.</p>
          </header>

          <div className={styles.glassCard}>
            <UrlInput submitHandler={submitHandler} loading={loading} />

            {error && <div style={{ color: '#ff4d4f', marginTop: '1rem', fontSize: '14px' }}>Error: {error}</div>}

            {/* Карточка с результатом */}
            {result && <UrlPreview data={result} />}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
