import Head from 'next/head';
import Link from 'next/link';
import styles from './Layout.module.css';

export default function Layout({ children, pageTitle }) {
  return (
    <div className={styles.layout}>
      <Head>
        <link rel="icon" href="favicon.ico" />
        <meta name="description" content="Atempo for practitioners" />
        <title>{pageTitle}</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.h1}>365Companies</h1>
      </header>
      {children}
      <footer className={styles.footer}>
        {' '}
        Fait avec ❤️ par&nbsp;{' '}
        <Link href="https://github.com/fflachat">
          <a className={styles.githubLink}> @fflachat</a>
        </Link>
      </footer>
    </div>
  );
}
