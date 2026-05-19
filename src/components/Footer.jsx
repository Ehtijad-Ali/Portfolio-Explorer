import { Link } from 'react-router-dom';
import { Zap, Code2, Globe } from 'lucide-react';
import styles from './Footer.module.css';

const LINKS = {
  Explore: [
    { label: 'Browse All',    to: '/browse' },
    { label: 'Frontend',      to: '/browse?role=Frontend' },
    { label: 'Full Stack',    to: '/browse?role=Full Stack' },
    { label: 'AI / ML',       to: '/browse?role=AI / ML' },
    { label: 'Designer',      to: '/browse?role=Designer' },
  ],
  Project: [
    { label: 'About',         to: '/about' },
    { label: 'Add your portfolio', to: '/about' },
  ],
};

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoMark}><Zap size={16} strokeWidth={2.5} /></span>
            <span>Portfolio<strong>Explorer</strong></span>
          </Link>
          <p className={styles.tagline}>
            A free, curated collection of 1,750+ professional portfolios to inspire developers and designers worldwide.
          </p>
          <div className={styles.socials}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Code2 size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Globe size={18} />
            </a>
          </div>
        </div>

        {Object.entries(LINKS).map(([group, items]) => (
          <div key={group} className={styles.group}>
            <h4 className={styles.groupTitle}>{group}</h4>
            <ul className={styles.groupList}>
              {items.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className={styles.groupLink}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} Portfolio Explorer. All rights reserved.</p>
          <p>Built with ♥ for creatives everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
