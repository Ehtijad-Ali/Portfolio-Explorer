import styles from './Button.module.css';
import { cn } from '../lib/utils';

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconAfter,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(styles.btn, styles[variant], styles[size], loading && styles.loading, className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden />}
      {!loading && icon && <span className={styles.iconWrap}>{icon}</span>}
      {children && <span>{children}</span>}
      {!loading && iconAfter && <span className={styles.iconWrap}>{iconAfter}</span>}
    </button>
  );
}
