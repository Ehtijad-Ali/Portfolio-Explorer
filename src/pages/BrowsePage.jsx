import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search, ExternalLink, X, Shuffle, LayoutGrid,
  List, Copy, Check, ArrowUp
} from 'lucide-react';
import { ALL_PORTFOLIOS } from '../data/allPortfolios';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { getInitials, hashColor } from '../lib/utils';
import { useRandomPortfolio } from '../hooks/useRandomPortfolio';
import styles from './BrowsePage.module.css';

const PAGE_SIZE = 48;

const ROLE_FILTERS = [
  { label: 'All',        emoji: '✦',  match: () => true },
  { label: 'Full Stack', emoji: '⚡', match: p => /full.?stack/i.test(p.role) },
  { label: 'Frontend',   emoji: '🎨', match: p => /frontend|front-end|front end|ui engineer|\breact dev|\bvue\b|\bangular\b/i.test(p.role) },
  { label: 'AI / ML',    emoji: '🤖', match: p => /\bai\b|machine learning|\bml\b|data sci|deep learning/i.test(p.role) },
  { label: 'Designer',   emoji: '✏️', match: p => /\bdesign|\bux\b|\bui\/ux\b|product design/i.test(p.role) },
  { label: 'Backend',    emoji: '⚙️', match: p => /backend|back-end|\bnode\b|\bdjango\b|\blaravel\b|\bspring\b/i.test(p.role) && !/full.?stack/i.test(p.role) },
  { label: 'Mobile',     emoji: '📱', match: p => /mobile|\bflutter\b|\bios\b|\bandroid\b|react native/i.test(p.role) },
  { label: 'DevOps',     emoji: '☁️', match: p => /devops|cloud engineer|infra|\bsre\b|platform engineer/i.test(p.role) },
];

// Pre-compute counts once
const ROLE_COUNTS = Object.fromEntries(
  ROLE_FILTERS.map(f => [f.label, ALL_PORTFOLIOS.filter(f.match).length])
);

function matchesFilters(p, query, roleLabel) {
  const q = query.toLowerCase().trim();
  const matchesQuery = !q ||
    p.name.toLowerCase().includes(q) ||
    p.role.toLowerCase().includes(q);

  const filter = ROLE_FILTERS.find(f => f.label === roleLabel) ?? ROLE_FILTERS[0];
  return matchesQuery && filter.match(p);
}

// Skeleton card for loading state
function SkeletonCard() {
  return (
    <div className={styles.skeletonCard} aria-hidden>
      <div className={`skeleton ${styles.skeletonAvatar}`} />
      <div className={styles.skeletonInfo}>
        <div className={`skeleton ${styles.skeletonName}`} />
        <div className={`skeleton ${styles.skeletonRole}`} />
      </div>
    </div>
  );
}

// Copy-link button per card
function CopyButton({ url }) {
  const [copied, setCopied] = useState(false);
  function copy(e) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }
  return (
    <button
      className={styles.copyBtn}
      onClick={copy}
      aria-label={copied ? 'Copied!' : 'Copy link'}
      title={copied ? 'Copied!' : 'Copy link'}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
}

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const [role,  setRole]  = useState(() => searchParams.get('role') ?? 'All');
  const [page,  setPage]  = useState(1);
  const [view,  setView]  = useState('grid'); // 'grid' | 'list'
  const [loading, setLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const topRef = useRef(null);

  const { openRandom, flash } = useRandomPortfolio();

  // Sync URL params → state
  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
    setRole(searchParams.get('role') ?? 'All');
    setPage(1);
  }, [searchParams]);

  // Show scroll-to-top after scrolling down
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Simulate loading flash on filter change
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [query, role]);

  // Scroll to top of results on page change
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [page]);

  const filtered = useMemo(
    () => ALL_PORTFOLIOS.filter(p => matchesFilters(p, query, role)),
    [query, role]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const slice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = useCallback((v) => {
    setQuery(v);
    setPage(1);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      v ? next.set('q', v) : next.delete('q');
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const handleRole = useCallback((r) => {
    setRole(r);
    setPage(1);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      r !== 'All' ? next.set('role', r) : next.delete('role');
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const clearAll = () => {
    setQuery(''); setRole('All'); setPage(1);
    setSearchParams({}, { replace: true });
  };

  const hasFilters = query || role !== 'All';

  return (
    <Layout>
      <div className={`page-enter ${styles.page}`}>

        {/* Header */}
        <div className={styles.header} ref={topRef}>
          <div className="container">
            <div className={styles.headerInner}>
              <div>
                <h1 className={styles.heading}>Portfolio Directory</h1>
                <p className={styles.sub}>
                  {ALL_PORTFOLIOS.length.toLocaleString()} curated portfolios · updated by the community
                </p>
              </div>
              {/* Random button — hero feature */}
              <button
                className={`${styles.randomBtn} ${flash ? styles.randomFlash : ''}`}
                onClick={() => openRandom(filtered.length < ALL_PORTFOLIOS.length ? filtered : null)}
                title="Open a random portfolio (press R)"
                aria-label="Open random portfolio"
              >
                <Shuffle size={16} />
                <span>Random</span>
                <kbd className={styles.kbd}>R</kbd>
              </button>
            </div>
          </div>
        </div>

        <div className="container">

          {/* Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.searchWrap}>
              <Search size={16} className={styles.searchIcon} aria-hidden />
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search by name or role…"
                value={query}
                onChange={e => handleSearch(e.target.value)}
                aria-label="Search portfolios"
              />
              {query && (
                <button className={styles.clearBtn} onClick={() => handleSearch('')} aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className={styles.toolbarRight}>
              <span className={styles.count}>
                {loading ? '…' : filtered.length.toLocaleString()} results
              </span>

              {/* View toggle */}
              <div className={styles.viewToggle} role="group" aria-label="View mode">
                <button
                  className={`${styles.viewBtn} ${view === 'grid' ? styles.viewBtnActive : ''}`}
                  onClick={() => setView('grid')}
                  aria-pressed={view === 'grid'}
                  title="Grid view"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  className={`${styles.viewBtn} ${view === 'list' ? styles.viewBtnActive : ''}`}
                  onClick={() => setView('list')}
                  aria-pressed={view === 'list'}
                  title="List view"
                >
                  <List size={15} />
                </button>
              </div>

              {hasFilters && (
                <button className={styles.clearAll} onClick={clearAll}>
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Browse by specialization */}
          <div className={styles.specSection}>
            <p className={styles.specHeading}>Browse by specialization</p>
            <div className={styles.specScroll} role="group" aria-label="Filter by specialization">
              {ROLE_FILTERS.map(({ label, emoji }) => (
                <button
                  key={label}
                  className={`${styles.specCard} ${role === label ? styles.specCardActive : ''}`}
                  onClick={() => handleRole(label)}
                  aria-pressed={role === label}
                >
                  <span className={styles.specEmoji}>{emoji}</span>
                  <span className={styles.specLabel}>{label}</span>
                  {label !== 'All' && (
                    <span className={styles.specCount}>{ROLE_COUNTS[label]}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className={view === 'grid' ? styles.grid : styles.listView}>
              {Array.from({ length: 12 }, (_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : slice.length > 0 ? (
            <div
              className={view === 'grid' ? styles.grid : styles.listView}
              role="list"
            >
              {slice.map((p, i) => (
                <div key={`${p.url}-${i}`} className={styles.cardWrap} role="listitem">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.card} ${view === 'list' ? styles.cardList : ''}`}
                    aria-label={`${p.name}${p.role ? ` — ${p.role}` : ''}`}
                  >
                    <div
                      className={styles.avatar}
                      style={{ background: hashColor(p.name) }}
                      aria-hidden
                    >
                      {getInitials(p.name)}
                    </div>
                    <div className={styles.info}>
                      <p className={styles.name}>{p.name}</p>
                      {p.role && <p className={styles.role} title={p.role}>{p.role}</p>}
                    </div>
                    <ExternalLink size={14} className={styles.extIcon} aria-hidden />
                  </a>
                  <CopyButton url={p.url} />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <Shuffle size={32} className={styles.emptyIcon} />
              <p className={styles.emptyTitle}>No portfolios match your search.</p>
              <p className={styles.emptySub}>Try a different role or clear your filters.</p>
              <Button variant="outline" size="sm" onClick={clearAll}>Clear filters</Button>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className={styles.pagination}>
              <Button variant="secondary" size="sm" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                ← Prev
              </Button>
              <div className={styles.pageNumbers}>
                {/* Show at most 7 page buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 2)
                  .reduce((acc, n, idx, arr) => {
                    if (idx > 0 && n - arr[idx - 1] > 1) acc.push('…');
                    acc.push(n);
                    return acc;
                  }, [])
                  .map((n, i) =>
                    n === '…' ? (
                      <span key={`ellipsis-${i}`} className={styles.ellipsis}>…</span>
                    ) : (
                      <button
                        key={n}
                        className={`${styles.pageBtn} ${n === page ? styles.pageBtnActive : ''}`}
                        onClick={() => setPage(n)}
                        aria-current={n === page ? 'page' : undefined}
                      >
                        {n}
                      </button>
                    )
                  )}
              </div>
              <Button variant="secondary" size="sm" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
                Next →
              </Button>
            </div>
          )}
        </div>

        {/* Scroll to top */}
        {showScrollTop && (
          <button
            className={styles.scrollTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        )}
      </div>
    </Layout>
  );
}
