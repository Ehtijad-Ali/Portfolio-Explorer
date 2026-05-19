import { useNavigate } from 'react-router-dom';
import { Users, Search, Zap, ArrowRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={`page-enter ${styles.page}`}>
        <div className="container">

          <div className={styles.hero}>
            <h1 className={styles.title}>About Portfolio Explorer</h1>
            <p className={styles.lead}>
              Portfolio Explorer was built to solve a real problem: developers and designers
              know they need a portfolio, but don't know where to start or what makes one great.
            </p>
          </div>

          <div className={styles.body}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>The problem we're solving</h2>
              <p>
                Recruiters increasingly expect candidates to have a live portfolio — but many
                talented professionals struggle to build one because they've never seen enough
                examples in their specific field. Generic advice like "make it clean" doesn't help
                when you don't know what clean looks like for a data scientist vs. a frontend engineer.
              </p>
              <p>
                Portfolio Explorer gives you a shortcut: browse <strong>1,750+ real portfolios</strong> from
                professionals across every tech and design specialization. See what the best ones
                have in common, steal great ideas, and build yours faster and smarter.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>What's inside</h2>
              <div className={styles.featureList}>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}><Search size={20} /></div>
                  <div>
                    <h3>Search by role</h3>
                    <p>Find portfolios from frontend developers, UX designers, AI engineers, full-stack devs, and more.</p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}><Users size={20} /></div>
                  <div>
                    <h3>1,750+ curated portfolios</h3>
                    <p>Every entry is a real professional's live portfolio, collected from the global developer community.</p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}><Zap size={20} /></div>
                  <div>
                    <h3>100% free</h3>
                    <p>No sign-up, no paywall, no catch. Just a useful tool for people building their careers.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Want to add yours?</h2>
              <p>
                Portfolio Explorer is community-driven. If you've built a portfolio you're proud of,
                open a pull request on GitHub and add it to the list.
              </p>
            </section>
          </div>

          <div className={styles.cta}>
            <Button size="lg" onClick={() => navigate('/browse')}>
              Start exploring <ArrowRight size={16} />
            </Button>
          </div>

        </div>
      </div>
    </Layout>
  );
}
