import { useState, useEffect } from 'react';
import styles from './UrlPreview.module.css';
import { IconCopy, IconExternal, IconCheck } from './PreviewCardIcons';

export default function UrlPreview({ data }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!data) return null;

  const { shortUrl, metadata } = data;
  const { title, description, image, domain } = metadata;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div className={styles.resultSection}>
      <h3 className={styles.resultTitle}>Result is ready</h3>

      <div className={styles.shortUrlRow}>
        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className={styles.shortUrlLink}>
          {shortUrl}
        </a>
        <button
          className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
          aria-label="Copy link"
        >
          {copied ? (
            <>
              <IconCheck /> Copied
            </>
          ) : (
            <>
              <IconCopy /> Copy
            </>
          )}
        </button>
      </div>

      <div className={styles.previewCard}>
        {image && <img src={image} alt={title || 'Preview'} className={styles.previewImage} />}
        <div className={styles.previewBody}>
          <div className={styles.previewDomain}>
            {domain} <IconExternal />
          </div>
          <h4 className={styles.previewTitle}>{title || 'No title'}</h4>
          <p className={styles.previewDesc}>{description || 'No description available'}</p>
        </div>
      </div>
    </div>
  );
}
