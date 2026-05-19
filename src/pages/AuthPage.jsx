import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import styles from './AuthPage.module.css';

export default function AuthPage() {
  const [params] = useSearchParams();
  const mode = params.get('mode') ?? 'signin';
  const redirect = params.get('redirect') ?? '/dashboard';
  const navigate = useNavigate();
  const { user, signIn, signUp, loading } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) navigate(redirect, { replace: true });
  }, [user, redirect, navigate]);

  const isSignup = mode === 'signup';

  function update(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    try {
      if (isSignup) await signUp(form.email, form.password, form.name || form.email.split('@')[0]);
      else await signIn(form.email, form.password);
    } catch {
      setError('Authentication failed. Please try again.');
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}><Zap size={16} strokeWidth={2.5} /></span>
          Portfolio<strong>Explorer</strong>
        </Link>

        <h1 className={styles.title}>
          {isSignup ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className={styles.sub}>
          {isSignup
            ? 'Start showcasing your work in minutes. Free forever.'
            : 'Sign in to access your portfolio and dashboard.'}
        </p>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {isSignup && (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className={styles.input}
                placeholder="Your full name"
                value={form.name}
                onChange={update('name')}
                autoComplete="name"
              />
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              value={form.email}
              onChange={update('email')}
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="password">Password</label>
              {!isSignup && (
                <Link to="/forgot-password" className={styles.forgot}>Forgot?</Link>
              )}
            </div>
            <div className={styles.passwordWrap}>
              <input
                id="password"
                type={showPwd ? 'text' : 'password'}
                className={styles.input}
                placeholder="••••••••"
                value={form.password}
                onChange={update('password')}
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPwd(v => !v)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className={styles.error} role="alert">{error}</p>}

          <Button size="lg" type="submit" loading={loading} className={styles.submitBtn}>
            {isSignup ? 'Create account' : 'Sign in'}
          </Button>
        </form>

        <p className={styles.switch}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <Link
            to={`/auth?mode=${isSignup ? 'signin' : 'signup'}`}
            className={styles.switchLink}
          >
            {isSignup ? 'Sign in' : 'Sign up free'}
          </Link>
        </p>

        {/* Demo hint */}
        <div className={styles.demoHint}>
          <p><strong>Demo tip:</strong> Use any email to sign in.</p>
          <p>Include "pro" or "agency" to test paid tiers.</p>
          <p>e.g. <code>user+pro@example.com</code></p>
        </div>
      </div>
    </div>
  );
}
