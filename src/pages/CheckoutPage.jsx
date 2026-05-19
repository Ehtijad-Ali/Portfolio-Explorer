import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Check, Lock, CreditCard } from 'lucide-react';
import { createCheckoutSession } from '../lib/stripe';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import styles from './CheckoutPage.module.css';

const PLAN_DETAILS = {
  pro: {
    name: 'Pro Plan',
    price: '$19',
    period: '/month',
    color: 'var(--color-brand)',
    features: ['Unlimited case studies', 'Private projects', 'Custom domain', 'PDF one-pagers', 'Priority support'],
  },
  agency: {
    name: 'Agency Plan',
    price: '$79',
    period: '/month',
    color: 'var(--color-tier-agency)',
    features: ['Everything in Pro', '10 team members', 'White-label branding', 'Client portal', 'SLA support'],
  },
};

export default function CheckoutPage() {
  const [params] = useSearchParams();
  const plan = params.get('plan') ?? 'pro';
  const navigate = useNavigate();
  const { user, upgradeTier } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const detail = PLAN_DETAILS[plan] ?? PLAN_DETAILS.pro;

  // If not logged in, redirect to auth
  useEffect(() => {
    if (!user) navigate(`/auth?mode=signup&redirect=/checkout?plan=${plan}`);
  }, [user, plan, navigate]);

  async function handleCheckout() {
    setLoading(true);
    setError('');
    try {
      const { url } = await createCheckoutSession(plan, user?.id);
      // Mock upgrade for demo
      upgradeTier(plan);
      navigate('/checkout/success?plan=' + plan);
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout noFooter>
      <div className={`page-enter ${styles.page}`}>
        <div className={styles.grid}>
          {/* Order summary */}
          <div className={styles.summary}>
            <div className={styles.summaryHeader}>
              <h2 className={styles.summaryTitle}>Order summary</h2>
            </div>
            <div className={styles.planDetail}>
              <div className={styles.planIcon} style={{ background: detail.color + '20', color: detail.color }}>
                <CreditCard size={20} />
              </div>
              <div>
                <p className={styles.planName}>{detail.name}</p>
                <p className={styles.planPrice}>{detail.price}<span>{detail.period}</span></p>
              </div>
            </div>
            <ul className={styles.featureList}>
              {detail.features.map(f => (
                <li key={f} className={styles.feature}>
                  <Check size={15} className={styles.featureIcon} />
                  {f}
                </li>
              ))}
            </ul>
            <div className={styles.guarantee}>
              <Lock size={14} />
              14-day money-back guarantee. Cancel anytime.
            </div>
          </div>

          {/* Payment */}
          <div className={styles.payment}>
            <h2 className={styles.paymentTitle}>Complete your upgrade</h2>
            <p className={styles.paymentSub}>
              Secure payment via Stripe. Your card is never stored on our servers.
            </p>

            {/* Mock card form — replaced by Stripe Elements in production */}
            <div className={styles.mockForm}>
              <div className={styles.field}>
                <label className={styles.label}>Card number</label>
                <div className={styles.fakeInput}>4242 4242 4242 4242</div>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Expiry</label>
                  <div className={styles.fakeInput}>12 / 26</div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>CVC</label>
                  <div className={styles.fakeInput}>•••</div>
                </div>
              </div>
              <p className={styles.mockNote}>
                Demo mode — Stripe Elements will render here in production.
              </p>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <Button
              size="lg"
              loading={loading}
              onClick={handleCheckout}
              className={styles.payBtn}
            >
              {loading ? 'Processing…' : `Upgrade to ${detail.name}`}
            </Button>

            <p className={styles.terms}>
              By upgrading, you agree to our{' '}
              <Link to="/terms">Terms of Service</Link> and{' '}
              <Link to="/privacy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
