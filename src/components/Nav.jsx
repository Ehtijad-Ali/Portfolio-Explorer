import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, Zap, ChevronDown, LogOut, User } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { Button } from './Button';
import styles from './Nav.module.css';
import { getInitials, hashColor } from '../lib/utils';

export function Nav() {
  const { theme, toggle } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/browse',  label: 'Browse Portfolios' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about',   label: 'About' },
  ];

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>
            <Zap size={18} strokeWidth={2.5} />
          </span>
          <span className={styles.logoText}>Portfolio<strong>Explorer</strong></span>
        </Link>

        {/* Desktop links */}
        <nav className={styles.links} aria-label="Main navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.iconBtn}
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <div className={styles.userMenu}>
              <button
                className={styles.avatarBtn}
                onClick={() => setDropdownOpen(o => !o)}
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
              >
                <span
                  className={styles.avatar}
                  style={{ background: hashColor(user.email) }}
                >
                  {getInitials(user.name)}
                </span>
                <ChevronDown size={14} />
              </button>
              {dropdownOpen && (
                <div className={styles.dropdown} role="menu">
                  <div className={styles.dropdownHeader}>
                    <p className={styles.dropdownName}>{user.name}</p>
                    <p className={styles.dropdownEmail}>{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    className={styles.dropdownItem}
                    onClick={() => setDropdownOpen(false)}
                    role="menuitem"
                  >
                    <User size={14} /> Dashboard
                  </Link>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => { signOut(); setDropdownOpen(false); }}
                    role="menuitem"
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/auth" className={styles.signIn}>Sign in</Link>
              <Button size="sm" onClick={() => navigate('/auth?mode=signup')}>
                Get started
              </Button>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          {!user && (
            <>
              <Link to="/auth" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                Sign in
              </Link>
              <Button size="md" onClick={() => { navigate('/auth?mode=signup'); setMenuOpen(false); }}>
                Get started free
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
