import { Link } from 'react-router-dom';
import { Lock, ArrowUpRight } from 'lucide-react';
import { Badge } from './Badge';
import { useAuth, hasAccess, TIERS } from '../hooks/useAuth';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project }) {
  const { user } = useAuth();
  const isLocked = project.tier !== 'free' && !hasAccess(user?.tier ?? 'free', project.tier);

  return (
    <article className={styles.card}>
      <Link
        to={isLocked ? '/pricing' : `/projects/${project.slug}`}
        className={styles.imageWrap}
        aria-label={isLocked ? `${project.title} — requires upgrade` : project.title}
      >
        <img
          src={project.coverImage}
          alt={project.title}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
        {isLocked && (
          <div className={styles.lockOverlay}>
            <div className={styles.lockIcon}><Lock size={20} /></div>
            <span className={styles.lockLabel}>
              {project.tier === 'pro' ? 'Pro' : 'Agency'} only
            </span>
          </div>
        )}
        {project.featured && (
          <span className={styles.featuredTag}>Featured</span>
        )}
      </Link>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.client}>{project.client}</span>
          <span className={styles.year}>{project.year}</span>
        </div>

        <h3 className={styles.title}>
          <Link
            to={isLocked ? '/pricing' : `/projects/${project.slug}`}
            className={styles.titleLink}
          >
            {project.title}
          </Link>
        </h3>

        <p className={styles.summary}>{project.summary}</p>

        <div className={styles.footer}>
          <div className={styles.tags}>
            {project.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="default">{tag}</Badge>
            ))}
          </div>
          {!isLocked && (
            <Link to={`/projects/${project.slug}`} className={styles.viewLink} aria-hidden="true">
              <ArrowUpRight size={16} />
            </Link>
          )}
        </div>

        {project.stats && !isLocked && (
          <div className={styles.stats}>
            {project.stats.slice(0, 3).map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
