import { useState } from 'react';
import styles from './UrlInput.module.css';
import { IconGlobe, IconX, IconArrow } from './FormIcons';

export default function UrlInput({ submitHandler, loading = false }) {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  // Простая проверка на валидность URL
  const isValidUrl = (str) => {
    // Должна быть точка и хотя бы 3 символа
    return str.includes('.') && str.trim().length >= 3;
  };

  const isInvalid = isTouched && value.trim().length > 0 && !isValidUrl(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !loading && isValidUrl(value)) {
      submitHandler(value.trim());
      setValue('');
      setIsTouched(false);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (!isTouched) setIsTouched(true);
  };

  return (
    <form className={styles.urlForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.urlInputFieldWrap}>
        <span className={styles.urlInputIcon}>
          <IconGlobe />
        </span>

        <input
          type="text"
          className={`${styles.urlInputField} ${isInvalid ? styles.isError : ''}`}
          placeholder="https://example.com/very-long-url"
          value={value}
          onChange={handleChange}
          disabled={loading}
          autoComplete="off"
          spellCheck={false}
          required
        />

        {value.trim() && !loading && (
          <button
            type="button"
            className={styles.urlInputClear}
            onClick={() => {
              setValue('');
              setIsTouched(false);
            }}
          >
            <IconX />
          </button>
        )}
      </div>

      {isInvalid && <div className={styles.urlInputMessage}>Please enter a valid URL</div>}

      <button
        id="shorten-btn"
        type="submit"
        className={`${styles.btn} ${styles.btnPrimary} ${styles.btnFull} ${loading ? styles.btnLoading : ''}`}
        disabled={!value.trim() || loading || !isValidUrl(value)}
      >
        {loading ? (
          <span className={styles.loadingText}>
            <div className={styles.btnSpinner} aria-hidden="true" />
            Creating link...
          </span>
        ) : (
          <>
            Shorten Link <IconArrow />
          </>
        )}
      </button>
    </form>
  );
}
