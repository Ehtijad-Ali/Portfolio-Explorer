import { useState, useMemo, useCallback } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { PROJECTS, ALL_TAGS } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import styles from './ExplorePage.module.css';

const PAGE_SIZE = 6;

const ROLE_FILTERS = ['All', 'Designer', 'Developer', 'Creative Director', 'Full-Stack'];

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedRole, setSelectedRole] = useState('All');
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return PROJECTS.filter(p => {
      const matchesQuery = !q ||
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(t => p.tags.includes(t));
      const matchesRole = selectedRole === 'All' ||
        p.role.toLowerCase().includes(selectedRole.toLowerCase());
      return matchesQuery && matchesTags && matchesRole;
    });
  }, [query, selectedTags, selectedRole]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleTagToggle = useCallback((tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    setPage(1);
  }, []);

  const clearFilters = () => {
    setQuery('');
    setSelectedTags([]);
    setSelectedRole('All');
    setPage(1);
  };

  const hasFilters = query || selectedTags.length > 0 || selectedRole !== 'All';

  return (
    <Layout>
      <div className={`page-enter ${styles.page}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className="container">
            <h1 className={styles.heading}>Explore Portfolios</h1>
            <p className={styles.sub}>
              {filtered.length} curated case studies from top freelancers and agencies
            </p>
          </div>
        </div>

        <div className="container">
          {/* Search + filter bar */}
          <div className={styles.toolbar}>
            <div className={styles.searchWrap}>
              <Search size={16} className={styles.searchIcon} aria-hidden />
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search by project, client, skill…"
                value={query}
                onChange={e => { setQuery(e.target.value); setPage(1); }}
                aria-label="Search projects"
              />
              {query && (
                <button className={styles.clearSearch} onClick={() => { setQuery(''); setPage(1); }} aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>

            <Button
              variant="secondary"
              size="sm"
              icon={<SlidersHorizontal size={14} />}
              onClick={() => setFiltersOpen(o => !o)}
              aria-expanded={filtersOpen}
            >
              Filters {selectedTags.length > 0 && `(${selectedTags.length})`}
            </Button>

            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            )}
          </div>

          {/* Role pills */}
          <div className={styles.rolePills}>
            {ROLE_FILTERS.map(role => (
              <button
                key={role}
                className={`${styles.pill} ${selectedRole === role ? styles.pillActive : ''}`}
                onClick={() => { setSelectedRole(role); setPage(1); }}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Tag filters panel */}
          {filtersOpen && (
            <div className={styles.tagPanel}>
              <p className={styles.tagPanelLabel}>Filter by skill</p>
              <div className={styles.tagGrid}>
                {ALL_TAGS.map(tag => (
                  <button
                    key={tag}
                    className={`${styles.tagBtn} ${selectedTags.includes(tag) ? styles.tagActive : ''}`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {paginated.length > 0 ? (
            <>
              <div className={styles.grid} role="list">
                {paginated.map(project => (
                  <div key={project.id} role="listitem">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.pagination} role="navigation" aria-label="Pagination">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setPage(p => p - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <div className={styles.pageNumbers}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                      <button
                        key={n}
                        className={`${styles.pageBtn} ${n === page ? styles.pageBtnActive : ''}`}
                        onClick={() => setPage(n)}
                        aria-current={n === page ? 'page' : undefined}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setPage(p => p + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.empty}>
              <p>No projects match your filters.</p>
              <Button variant="outline" size="sm" onClick={clearFilters}>Clear filters</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
