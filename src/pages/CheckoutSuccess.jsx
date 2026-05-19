import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import styles from './CheckoutSuccess.module.css';

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const plan = params.get('plan') ?? 'pro';

  return (
    <Layout noFooter>
      <div className={`page-enter ${styles.page}`}>
        <div className={styles.card}>
          <div className={styles.icon}><CheckCircle size={48} strokeWidth={1.5} /></div>
          <h1 className={styles.title}>You're all set!</h1>
          <p className={styles.sub}>
            Welcome to the <strong>{plan.charAt(0).toUpperCase() + plan.slice(1)} plan</strong>.
            Your account has been upgraded and all premium features are now unlocked.
          </p>
          <div className={styles.actions}>
            <Button size="lg" onClick={() => window.location.href = '/dashboard'}>
              Go to Dashboard <ArrowRight size={16} />
            </Button>
            <Link to="/explore" className={styles.link}>Browse projects →</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
