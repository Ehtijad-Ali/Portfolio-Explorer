import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Layers, Users, Zap, Star, Shuffle, ExternalLink } from 'lucide-react';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import { TESTIMONIALS } from '../data/projects';
import { useRandomPortfolio } from '../hooks/useRandomPortfolio';
import { getInitials, hashColor } from '../lib/utils';
import styles from './LandingPage.module.css';

// Hand-picked featured portfolios that represent different roles
const FEATURED_PICKS = [
  { name: 'Brittany Chiang',  url: 'https://brittanychiang.com',    role: 'Software Engineer',         why: 'The gold standard — clean, fast, memorable.' },
  { name: 'Bruno Simon',      url: 'https://bruno-simon.com',       role: '3D / Creative Developer',   why: 'Drives a car around the page. Unforgettable.' },
  { name: 'Cassie Evans',     url: 'https://www.cassie.codes',      role: 'Frontend Developer',        why: 'SVG animations that feel alive.' },
  { name: 'Josh Comeau',      url: 'https://www.joshwcomeau.com',   role: 'Developer & Educator',      why: 'Shows personality without sacrificing craft.' },
  { name: 'Sara Soueidan',    url: 'https://www.sarasoueidan.com',  role: 'UI/Accessibility Engineer', why: 'Accessibility-first and professionally sharp.' },
  { name: 'Lynn Fisher',      url: 'https://lynnandtonic.com',      role: 'Designer & Developer',      why: 'Redesigned every year — always surprising.' },
];

const STATS = [
  { value: '1,750+', label: 'Portfolios' },
  { value: '50+',    label: 'Specializations' },
  { value: '100%',   label: 'Free' },
];

const CATEGORIES = [
  { label: 'Full Stack',  count: 393,  query: 'Full Stack', emoji: '⚡', color: '#6c47ff', bg: 'rgba(108,71,255,.08)',  desc: 'End-to-end builders' },
  { label: 'Frontend',    count: 102,  query: 'Frontend',   emoji: '🎨', color: '#0ea5e9', bg: 'rgba(14,165,233,.08)',  desc: 'UI & interaction craft' },
  { label: 'AI / ML',     count: 90,   query: 'AI / ML',    emoji: '🤖', color: '#8b5cf6', bg: 'rgba(139,92,246,.08)',  desc: 'Models & data science' },
  { label: 'Designer',    count: 42,   query: 'Designer',   emoji: '✏️', color: '#f59e0b', bg: 'rgba(245,158,11,.08)',  desc: 'UX, product & visual' },
  { label: 'Backend',     count: 30,   query: 'Backend',    emoji: '⚙️', color: '#10b981', bg: 'rgba(16,185,129,.08)',  desc: 'APIs, infra & systems' },
  { label: 'Mobile',      count: 27,   query: 'Mobile',     emoji: '📱', color: '#f43f5e', bg: 'rgba(244,63,94,.08)',   desc: 'iOS, Android & Flutter' },
  { label: 'DevOps',      count: 29,   query: 'DevOps',     emoji: '☁️', color: '#00c9a7', bg: 'rgba(0,201,167,.08)',   desc: 'Cloud, CI/CD & SRE' },
  { label: 'All',         count: 1754, query: '',           emoji: '✦',  color: '#6c47ff', bg: 'rgba(108,71,255,.08)',  desc: 'Every portfolio' },
];

const HOW_IT_WORKS = [
  {
    icon: <Search size={20} />,
    step: '01',
    title: 'Search your role',
    body: 'Type your job title or specialization — frontend, data scientist, UX designer, and more.',
    detail: 'Try "senior frontend", "ML engineer", or "product designer"',
  },
  {
    icon: <Layers size={20} />,
    step: '02',
    title: 'Browse real portfolios',
    body: 'Explore 1,750+ live portfolios built by real professionals across every tech and design discipline.',
    detail: 'Filter by role, view grid or list, open any portfolio in one click',
  },
  {
    icon: <Zap size={20} />,
    step: '03',
    title: 'Build yours faster',
    body: 'See what works, steal great ideas, and build your own portfolio with confidence.',
    detail: 'Most users go from zero to a plan in under 20 minutes',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { openRandom, flash } = useRandomPortfolio();

  function browseCategory(query) {
    if (query) {
      navigate(`/browse?role=${encodeURIComponent(query)}`);
    } else {
      navigate('/browse');
    }
  }

  return (
    <Layout>

      {/* ── Hero ── */}
      <section className={`page-enter ${styles.hero}`}>
        <div className={`container ${styles.heroInner}`}>

          <div className={styles.heroEyebrow}>
            <Star size={13} fill="currentColor" /> Trusted by developers and designers worldwide
          </div>

          <h1 className={styles.heroHeading}>
            Find your portfolio inspiration,<br />
            <span className="gradient-text">in seconds.</span>
          </h1>

          <p className={styles.heroSub}>
            Portfolio Explorer is a curated collection of <strong>1,750+ professional portfolios</strong> from
            developers, designers, and engineers across the world. Search by role, browse real examples,
            and build your own portfolio faster and smarter.
          </p>

          {/* Inline search */}
          <div className={styles.heroSearch}>
            <Search size={18} className={styles.heroSearchIcon} aria-hidden />
            <input
              type="search"
              className={styles.heroSearchInput}
              placeholder="Search by role — e.g. frontend developer, UX designer…"
              aria-label="Search portfolios"
              onKeyDown={e => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  navigate(`/browse?q=${encodeURIComponent(e.target.value.trim())}`);
                }
              }}
            />
            <Button
              size="md"
              className={styles.heroSearchBtn}
              onClick={e => {
                const input = e.currentTarget.closest(`.${styles.heroSearch}`).querySelector('input');
                const q = input.value.trim();
                navigate(q ? `/browse?q=${encodeURIComponent(q)}` : '/browse');
              }}
            >
              Explore <ArrowRight size={15} />
            </Button>
          </div>

          {/* Random shortcut hint */}
          <div className={styles.heroOr}>
            <span className={styles.heroOrLine} />
            <span className={styles.heroOrText}>or</span>
            <span className={styles.heroOrLine} />
          </div>
          <button
            className={`${styles.randomHero} ${flash ? styles.randomFlash : ''}`}
            onClick={() => openRandom()}
          >
            <Shuffle size={16} />
            Feeling lucky? Open a random portfolio
            <kbd className={styles.heroKbd}>R</kbd>
          </button>

          {/* Stats */}
          <div className={styles.stats}>
            {STATS.map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category cards ── */}
      <section className={styles.categories}>
        <div className="container">
          <div className={styles.categoriesHeader}>
            <div>
              <p className={styles.categoriesEyebrow}>Specializations</p>
              <h2 className={styles.sectionTitle}>Browse by specialization</h2>
              <p className={styles.sectionSub}>Find portfolios from professionals in your exact field.</p>
            </div>
          </div>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.label}
                className={styles.categoryCard}
                onClick={() => browseCategory(cat.query)}
                style={{ '--cat-color': cat.color, '--cat-bg': cat.bg }}
              >
                <div className={styles.categoryTop}>
                  <span className={styles.categoryEmoji}>{cat.emoji}</span>
                  <span className={styles.categoryArrow}>→</span>
                </div>
                <span className={styles.categoryLabel}>{cat.label}</span>
                <span className={styles.categoryDesc}>{cat.desc}</span>
                <span className={styles.categoryCount}>{cat.count.toLocaleString()} portfolios</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Picks ── */}
      <section className={styles.featured}>
        <div className="container">
          <div className={styles.featuredHeader}>
            <div>
              <p className={styles.featuredEyebrow}>Curated for you</p>
              <h2 className={styles.sectionTitle}>Editor's picks</h2>
              <p className={styles.sectionSub}>Hand-selected portfolios worth studying closely.</p>
            </div>
            <button className={styles.featuredBrowseAll} onClick={() => navigate('/browse')}>
              Browse all <ArrowRight size={14} />
            </button>
          </div>
          <div className={styles.featuredGrid}>
            {FEATURED_PICKS.map((p, i) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.featuredCard}
              >
                <div className={styles.featuredCardBg} style={{ background: hashColor(p.name) }} aria-hidden />
                <div className={styles.featuredCardInner}>
                  <div className={styles.featuredTop}>
                    <div className={styles.featuredAvatar} style={{ background: hashColor(p.name) }}>
                      {getInitials(p.name)}
                    </div>
                    <span className={styles.featuredNum}>0{i + 1}</span>
                  </div>
                  <div className={styles.featuredBody}>
                    <p className={styles.featuredName}>{p.name}</p>
                    <p className={styles.featuredRole}>{p.role}</p>
                    <p className={styles.featuredWhy}>"{p.why}"</p>
                  </div>
                  <div className={styles.featuredFooter}>
                    <span className={styles.featuredVisit}>Visit portfolio</span>
                    <ExternalLink size={13} className={styles.featuredExt} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className={styles.howItWorks}>
        <div className={styles.howBg} aria-hidden />
        <div className={`container ${styles.howContent}`}>
          <div className={styles.howHeader}>
            <p className={styles.howEyebrow}>Simple process</p>
            <h2 className={styles.howTitle}>How it works</h2>
            <p className={styles.howSub}>From stuck to inspired in three steps.</p>
          </div>
          <div className={styles.stepsGrid}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className={styles.stepCard}>
                {/* connector arrow between cards */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className={styles.stepArrow} aria-hidden>→</div>
                )}
                <div className={styles.stepTop}>
                  <span className={styles.stepNum}>{step.step}</span>
                  <div className={styles.stepIconWrap}>{step.icon}</div>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
                <p className={styles.stepDetail}>{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className={styles.testimonials}>
        <div className="container">
          <div className={styles.testimonialsLayout}>

            {/* Left — heading + stats */}
            <div className={styles.testimonialsLeft}>
              <p className={styles.testimonialsEyebrow}>What people say</p>
              <h2 className={styles.testimonialsHeading}>
                Real results from<br />real people.
              </h2>
              <p className={styles.testimonialsSub}>
                Thousands of developers and designers use Portfolio Explorer
                to get unstuck and ship their portfolio faster.
              </p>
              <div className={styles.testimonialStats}>
                {[
                  { value: '12k+', label: 'Users' },
                  { value: '4.9★', label: 'Rating' },
                  { value: '1,754', label: 'Portfolios' },
                ].map(s => (
                  <div key={s.label} className={styles.testimonialStat}>
                    <span className={styles.testimonialStatValue}>{s.value}</span>
                    <span className={styles.testimonialStatLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — cards */}
            <div className={styles.testimonialsRight}>
              {/* Featured large card */}
              {TESTIMONIALS.filter(t => t.featured).map(t => (
                <div key={t.id} className={styles.testimonialFeatured} style={{ '--t-color': t.color }}>
                  <div className={styles.testimonialFeaturedGlow} aria-hidden />
                  <div className={styles.testimonialStars}>
                    {Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <blockquote className={styles.testimonialFeaturedQuote}>
                    "{t.quote}"
                  </blockquote>
                  <footer className={styles.testimonialFooter}>
                    <div className={styles.testimonialAvatar} style={{ background: t.color }}>
                      {getInitials(t.author)}
                    </div>
                    <div>
                      <cite className={styles.testimonialAuthor}>{t.author}</cite>
                      <p className={styles.testimonialRole}>{t.role} · <span className={styles.testimonialCompany}>{t.company}</span></p>
                    </div>
                  </footer>
                </div>
              ))}

              {/* Two smaller cards */}
              <div className={styles.testimonialSmallRow}>
                {TESTIMONIALS.filter(t => !t.featured).map(t => (
                  <div key={t.id} className={styles.testimonialSmall} style={{ '--t-color': t.color }}>
                    <div className={styles.testimonialStars}>
                      {Array.from({ length: 5 }, (_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                    <blockquote className={styles.testimonialSmallQuote}>"{t.quote}"</blockquote>
                    <footer className={styles.testimonialFooter}>
                      <div className={styles.testimonialAvatarSm} style={{ background: t.color }}>
                        {getInitials(t.author)}
                      </div>
                      <div>
                        <cite className={styles.testimonialAuthor}>{t.author}</cite>
                        <p className={styles.testimonialRole}>{t.role}</p>
                      </div>
                    </footer>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>
              Stop staring at a blank page.
            </h2>
            <p className={styles.ctaSub}>
              Browse 1,750+ portfolios and find the inspiration you need — free, forever.
            </p>
            <Button size="xl" onClick={() => navigate('/browse')}>
              Start exploring <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

    </Layout>
  );
}
