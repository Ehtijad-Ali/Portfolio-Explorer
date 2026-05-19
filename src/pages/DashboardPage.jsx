import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BarChart2, Lock, Settings, Plus, ExternalLink, Users, Star } from 'lucide-react';
import { useAuth, TIERS } from '../hooks/useAuth';
import { PROJECTS } from '../data/projects';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Layout } from '../components/Layout';
import { hashColor, getInitials } from '../lib/utils';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/auth?redirect=/dashboard');
  }, [user, navigate]);

  if (!user) return null;

  const userProjects = PROJECTS.filter(p => p.tier === 'free' || user.tier !== TIERS.FREE);

  const stats = [
    { label: 'Projects', value: userProjects.length, icon: <BarChart2 size={18} /> },
    { label: 'Views this month', value: '1,284', icon: <Star size={18} /> },
    { label: 'Saved by others', value: '47', icon: <Users size={18} /> },
  ];

  return (
    <Layout>
      <div className={`page-enter ${styles.page}`}>
        <div className="container">
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.userInfo}>
              <div
                className={styles.avatar}
                style={{ background: hashColor(user.email) }}
              >
                {getInitials(user.name)}
              </div>
              <div>
                <h1 className={styles.name}>Hey, {user.name.split(' ')[0]} 👋</h1>
                <p className={styles.email}>{user.email}</p>
              </div>
            </div>
            <div className={styles.headerActions}>
              <Badge variant={user.tier === 'free' ? 'default' : 'brand'}>
                {user.tier.toUpperCase()} PLAN
              </Badge>
              {user.tier === TIERS.FREE && (
                <Button size="sm" onClick={() => navigate('/pricing')}>
                  Upgrade to Pro
                </Button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className={styles.statsGrid}>
            {stats.map(s => (
              <div key={s.label} className={styles.statCard}>
                <div className={styles.statIcon}>{s.icon}</div>
                <p className={styles.statValue}>{s.value}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Upgrade banner for free users */}
          {user.tier === TIERS.FREE && (
            <div className={styles.upgradeBanner}>
              <div className={styles.upgradeText}>
                <Lock size={20} />
                <div>
                  <p className={styles.upgradeTitle}>Unlock private projects, custom domains & analytics</p>
                  <p className={styles.upgradeSub}>Pro plan — $19/month. Cancel anytime.</p>
                </div>
              </div>
              <Button variant="primary" size="sm" onClick={() => navigate('/checkout?plan=pro')}>
                Upgrade now →
              </Button>
            </div>
          )}

          {/* Projects */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Your projects</h2>
              <Button variant="secondary" size="sm" icon={<Plus size={14} />}>
                Add project
              </Button>
            </div>

            <div className={styles.projectTable}>
              {userProjects.map(p => (
                <div key={p.id} className={styles.projectRow}>
                  <div className={styles.projectThumb}>
                    <img src={p.coverImage} alt={p.title} />
                  </div>
                  <div className={styles.projectInfo}>
                    <p className={styles.projectTitle}>{p.title}</p>
                    <p className={styles.projectClient}>{p.client} · {p.year}</p>
                  </div>
                  <div className={styles.projectTags}>
                    {p.tags.slice(0, 2).map(t => <Badge key={t}>{t}</Badge>)}
                  </div>
                  <div className={styles.projectActions}>
                    <Link to={`/projects/${p.slug}`} className={styles.rowAction} aria-label="View">
                      <ExternalLink size={14} />
                    </Link>
                    <button className={styles.rowAction} aria-label="Settings">
                      <Settings size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
