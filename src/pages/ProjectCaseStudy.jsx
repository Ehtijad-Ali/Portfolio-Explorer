import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Lock, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { Layout } from '../components/Layout';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { useAuth, hasAccess } from '../hooks/useAuth';
import styles from './ProjectCaseStudy.module.css';

function BlockHero({ block }) {
  return (
    <div className={styles.blockHero}>
      <div className={styles.heroContent}>
        <h2 className={styles.heroHeading}>{block.heading}</h2>
        <p className={styles.heroSub}>{block.subheading}</p>
      </div>
      <div className={styles.heroImage}>
        <img src={block.image} alt={block.heading} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}

function BlockText({ block }) {
  return (
    <div className={styles.blockText}>
      {block.heading && <h3 className={styles.blockHeading}>{block.heading}</h3>}
      <p className={styles.blockBody}>{block.body}</p>
    </div>
  );
}

function BlockImage({ block }) {
  return (
    <figure className={styles.blockImage}>
      <img src={block.src} alt={block.caption ?? ''} loading="lazy" decoding="async" />
      {block.caption && <figcaption className={styles.blockCaption}>{block.caption}</figcaption>}
    </figure>
  );
}

function BlockMetrics({ block }) {
  return (
    <div className={styles.blockMetrics}>
      {block.items.map(item => (
        <div key={item.label} className={styles.metricItem}>
          <span className={styles.metricValue}>{item.value}</span>
          <span className={styles.metricLabel}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function BlockQuote({ block }) {
  return (
    <blockquote className={styles.blockQuote}>
      <p className={styles.quoteText}>"{block.text}"</p>
      <footer className={styles.quoteFooter}>
        {block.avatar && (
          <img src={block.avatar} alt={block.author} className={styles.quoteAvatar} />
        )}
        <div>
          <cite className={styles.quoteAuthor}>{block.author}</cite>
          <p className={styles.quoteRole}>{block.role}</p>
        </div>
      </footer>
    </blockquote>
  );
}

const BLOCK_MAP = {
  hero: BlockHero,
  text: BlockText,
  image: BlockImage,
  metrics: BlockMetrics,
  quote: BlockQuote,
};

export default function ProjectCaseStudy() {
  const { slug } = useParams();
  const { user } = useAuth();
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) return <Navigate to="/explore" replace />;

  const isLocked = project.tier !== 'free' && !hasAccess(user?.tier ?? 'free', project.tier);

  return (
    <Layout>
      <article className={`page-enter ${styles.page}`}>
        {/* Back */}
        <div className={`container ${styles.backRow}`}>
          <Link to="/explore" className={styles.back}>
            <ArrowLeft size={16} /> Back to Explore
          </Link>
        </div>

        {/* Hero header */}
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.heroBadges}>
              {project.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
              {project.tier !== 'free' && (
                <Badge variant="brand">
                  {project.tier === 'pro' ? 'Pro' : 'Agency'}
                </Badge>
              )}
            </div>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.summary}>{project.summary}</p>
            <div className={styles.heroMeta}>
              <span><strong>Client:</strong> {project.client}</span>
              <span><strong>Role:</strong> {project.role}</span>
              <span><strong>Year:</strong> {project.year}</span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        {project.stats && (
          <div className={styles.statsBar}>
            <div className="container">
              <div className={styles.statsGrid}>
                {project.stats.map(s => (
                  <div key={s.label} className={styles.statItem}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Color palette */}
        {project.palette && (
          <div className="container">
            <div className={styles.palette}>
              {project.palette.map(color => (
                <div
                  key={color}
                  className={styles.paletteChip}
                  style={{ background: color }}
                  title={color}
                  aria-label={color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Case study blocks */}
        {isLocked ? (
          <div className={`container ${styles.gateWrap}`}>
            {/* Show first block preview blurred */}
            <div className={styles.blurPreview}>
              {project.blocks.slice(0, 1).map((block, i) => {
                const Block = BLOCK_MAP[block.type];
                return Block ? <Block key={i} block={block} /> : null;
              })}
            </div>
            <div className={styles.gate}>
              <div className={styles.gateIcon}><Lock size={24} /></div>
              <h3 className={styles.gateTitle}>
                {project.tier === 'pro' ? 'Pro' : 'Agency'} plan required
              </h3>
              <p className={styles.gateSub}>
                Unlock this full case study and {project.tier === 'pro' ? '100+' : '500+'} more with a{' '}
                {project.tier === 'pro' ? 'Pro' : 'Agency'} subscription.
              </p>
              <Button size="lg" onClick={() => window.location.href = '/pricing'}>
                Upgrade to {project.tier === 'pro' ? 'Pro' : 'Agency'} →
              </Button>
              <Link to="/pricing" className={styles.gateLink}>See all plans</Link>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className={styles.blocks}>
              {project.blocks.map((block, i) => {
                const Block = BLOCK_MAP[block.type];
                return Block ? <Block key={i} block={block} /> : null;
              })}
            </div>
          </div>
        )}
      </article>
    </Layout>
  );
}
