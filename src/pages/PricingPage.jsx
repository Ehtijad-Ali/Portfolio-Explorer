import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check, Zap, Star, Building2, ArrowRight, ChevronDown
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import styles from './PricingPage.module.css';

const PLANS = [
  {
    id: 'free',
    icon: Zap,
    name: 'Free',
    monthly: 0,
    yearly: 0,
    tagline: 'For anyone getting started',
    cta: 'Start for free',
    ctaVariant: 'secondary',
    features: [
      'Browse all 1,750+ portfolios',
      'Filter by role & category',
      'Instant full-text search',
      'Random portfolio discovery',
      'Grid & list view',
      'Copy portfolio links',
    ],
  },
  {
    id: 'pro',
    icon: Star,
    name: 'Pro',
    monthly: 5,
    yearly: 4,
    tagline: 'For serious job seekers & builders',
    cta: 'Get Pro',
    ctaVariant: 'primary',
    badge: 'Most popular',
    features: [
      'Everything in Free',
      'Unlimited bookmarks',
      'Create & organise collections',
      'Portfolio quality scores',
      'Weekly curated digest email',
      'Early access to new features',
    ],
  },
  {
    id: 'agency',
    icon: Building2,
    name: 'Agency',
    monthly: 19,
    yearly: 15,
    tagline: 'For hiring teams & studios',
    cta: 'Get Agency',
    ctaVariant: 'outline',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Shared team collections',
      'CSV & JSON export',
      'API access',
      'Priority support',
    ],
  },
];

const FAQS = [
  {
    q: 'Is the free plan really free?',
    a: 'Yes, completely. Browse all portfolios, search, filter, and discover — no credit card required, no time limit.',
  },
  {
    q: 'What is a "collection"?',
    a: 'Collections let you save and organise portfolios you find inspiring — like playlists for portfolio ideas. Perfect when preparing your own build.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Absolutely. Cancel from your dashboard with one click. You keep Pro access until the end of your billing period — no questions asked.',
  },
  {
    q: 'How does the annual discount work?',
    a: 'Switch to yearly billing and get ~20% off. Pro drops to $4/mo (billed $48/yr) and Agency to $15/mo (billed $180/yr).',
  },
  {
    q: 'Do you add new portfolios regularly?',
    a: 'Yes — the directory is updated continuously by the community. All plans see new additions immediately.',
  },
  {
    q: 'What are portfolio quality scores?',
    a: 'Our algorithm rates each portfolio on design, depth, and completeness so you can filter for truly stand-out examples faster.',
  },
];

const LOGOS = ['Linear', 'Vercel', 'Figma', 'Notion', 'Loom', 'Framer'];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
      <button className={styles.faqQ} onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{q}</span>
        <ChevronDown size={16} className={styles.faqChevron} />
      </button>
      {open && <p className={styles.faqA}>{a}</p>}
    </div>
  );
}

export default function PricingPage() {
  const navigate = useNavigate();
  const [yearly, setYearly] = useState(false);

  return (
    <Layout>
      <div className={`page-enter ${styles.page}`}>

        {/* ── Hero ── */}
        <div className={styles.hero}>
          <div className={styles.heroBg} aria-hidden />
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>Pricing</span>
            <h1 className={styles.heading}>
              Simple, transparent pricing.<br />
              <span className={styles.headingAccent}>Start free. Grow when ready.</span>
            </h1>
            <p className={styles.sub}>
              Portfolio Explorer is free forever. Pro adds bookmarks, collections,
              and quality scores for developers who are serious about landing their next role.
            </p>

            {/* Billing toggle */}
            <div className={styles.toggle}>
              <span className={!yearly ? styles.toggleActive : styles.toggleLabel}>Monthly</span>
              <button
                className={`${styles.toggleSwitch} ${yearly ? styles.toggleSwitchOn : ''}`}
                onClick={() => setYearly(y => !y)}
                aria-label="Toggle annual billing"
                role="switch"
                aria-checked={yearly}
              >
                <span className={styles.toggleThumb} />
              </button>
              <span className={yearly ? styles.toggleActive : styles.toggleLabel}>
                Annual
                <span className={styles.toggleSave}>Save 20%</span>
              </span>
            </div>
          </div>
        </div>

        <div className="container">

          {/* ── Plans ── */}
          <div className={styles.plans}>
            {PLANS.map(plan => {
              const Icon = plan.icon;
              const price = yearly ? plan.yearly : plan.monthly;
              return (
                <div
                  key={plan.id}
                  className={`${styles.plan} ${plan.badge ? styles.planFeatured : ''}`}
                >
                  {plan.badge && <span className={styles.badge}>{plan.badge}</span>}

                  <div className={styles.planHeader}>
                    <span className={`${styles.planIcon} ${plan.badge ? styles.planIconFeatured : ''}`}>
                      <Icon size={18} />
                    </span>
                    <div>
                      <h2 className={styles.planName}>{plan.name}</h2>
                      <p className={styles.planTagline}>{plan.tagline}</p>
                    </div>
                  </div>

                  <div className={styles.priceBlock}>
                    <div className={styles.priceRow}>
                      <span className={styles.priceCurrency}>$</span>
                      <span className={styles.price}>{price}</span>
                      {plan.monthly > 0 && (
                        <span className={styles.pricePer}>/mo</span>
                      )}
                    </div>
                    {plan.monthly > 0 && (
                      <p className={styles.priceSub}>
                        {yearly
                          ? `Billed $${plan.yearly * 12}/yr`
                          : 'Billed monthly · cancel anytime'}
                      </p>
                    )}
                    {plan.monthly === 0 && (
                      <p className={styles.priceSub}>No credit card required</p>
                    )}
                  </div>

                  <Button
                    variant={plan.ctaVariant}
                    size="md"
                    className={styles.planBtn}
                    onClick={() => navigate(
                      plan.id === 'free'
                        ? '/browse'
                        : `/auth?mode=signup&plan=${plan.id}&billing=${yearly ? 'yearly' : 'monthly'}`
                    )}
                  >
                    {plan.cta}
                    {plan.badge && <ArrowRight size={15} style={{ marginLeft: 6 }} />}
                  </Button>

                  <div className={styles.divider} />

                  <ul className={styles.features}>
                    {plan.features.map(text => (
                      <li key={text} className={styles.feature}>
                        <span className={`${styles.featureIcon} ${plan.badge ? styles.featureIconFeatured : ''}`}>
                          <Check size={14} strokeWidth={2.5} />
                        </span>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* ── Trust bar ── */}
          <div className={styles.trust}>
            <p className={styles.trustLabel}>Used by people at</p>
            <div className={styles.trustLogos}>
              {LOGOS.map(l => (
                <span key={l} className={styles.trustLogo}>{l}</span>
              ))}
            </div>
          </div>

          {/* ── Feature comparison ── */}
          <div className={styles.compare}>
            <h2 className={styles.compareHeading}>Everything you get</h2>
            <div className={styles.compareGrid}>
              {[
                { label: 'Portfolio directory', free: true, pro: true, agency: true },
                { label: 'Role & category filters', free: true, pro: true, agency: true },
                { label: 'Instant search', free: true, pro: true, agency: true },
                { label: 'Random discovery (R key)', free: true, pro: true, agency: true },
                { label: 'Bookmarks', free: false, pro: true, agency: true },
                { label: 'Collections', free: false, pro: true, agency: true },
                { label: 'Quality scores', free: false, pro: true, agency: true },
                { label: 'Weekly digest email', free: false, pro: true, agency: true },
                { label: 'Team seats', free: false, pro: false, agency: '10' },
                { label: 'CSV / JSON export', free: false, pro: false, agency: true },
                { label: 'API access', free: false, pro: false, agency: true },
                { label: 'Priority support', free: false, pro: false, agency: true },
              ].map(row => (
                <div key={row.label} className={styles.compareRow}>
                  <span className={styles.compareFeature}>{row.label}</span>
                  {(['free', 'pro', 'agency']).map(tier => (
                    <span key={tier} className={styles.compareCell}>
                      {row[tier] === true
                        ? <Check size={15} className={styles.compareCheck} />
                        : row[tier] === false
                        ? <span className={styles.compareDash}>—</span>
                        : <span className={styles.compareValue}>{row[tier]}</span>}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className={styles.compareHeader}>
              <span className={styles.compareFeature} />
              <span className={styles.compareHeadCell}>Free</span>
              <span className={styles.compareHeadCell}>Pro</span>
              <span className={styles.compareHeadCell}>Agency</span>
            </div>
          </div>

          {/* ── FAQ ── */}
          <div className={styles.faq}>
            <h2 className={styles.faqHeading}>Frequently asked questions</h2>
            <div className={styles.faqList}>
              {FAQS.map(({ q, a }) => (
                <FaqItem key={q} q={q} a={a} />
              ))}
            </div>
          </div>

          {/* ── Bottom CTA ── */}
          <div className={styles.bottomCta}>
            <div className={styles.bottomGlow} aria-hidden />
            <p className={styles.bottomEyebrow}>Get started today</p>
            <h2 className={styles.bottomHeading}>
              Find the portfolio that<br />inspires your best work.
            </h2>
            <p className={styles.bottomSub}>
              Join 12,000+ developers and designers who use Portfolio Explorer
              to build stand-out portfolios faster.
            </p>
            <div className={styles.bottomBtns}>
              <Button size="lg" onClick={() => navigate('/browse')}>
                Browse for free
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/auth?mode=signup&plan=pro')}
              >
                Try Pro — $5/mo
              </Button>
            </div>
            <p className={styles.bottomNote}>No credit card · Cancel anytime · Instant access</p>
          </div>

        </div>
      </div>
    </Layout>
  );
}
