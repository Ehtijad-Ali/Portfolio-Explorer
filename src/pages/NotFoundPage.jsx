import { useNavigate } from 'react-router-dom';
import { Shuffle, ArrowLeft } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { useRandomPortfolio } from '../hooks/useRandomPortfolio';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { openRandom } = useRandomPortfolio();

  return (
    <Layout noFooter>
      <div className={`page-enter ${styles.page}`}>
        <div className={styles.card}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.sub}>
            This page doesn't exist — but 1,750+ portfolios do.
          </p>
          <div className={styles.actions}>
            <Button size="lg" onClick={() => navigate('/browse')}>
              Browse portfolios
            </Button>
            <Button variant="secondary" size="lg" icon={<Shuffle size={16} />} onClick={() => openRandom()}>
              Random portfolio
            </Button>
          </div>
          <button className={styles.back} onClick={() => navigate(-1)}>
            <ArrowLeft size={14} /> Go back
          </button>
        </div>
      </div>
    </Layout>
  );
}
