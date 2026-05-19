import styles from './Badge.module.css';
import { cn } from '../lib/utils';

export function Badge({ children, variant = 'default', className }) {
  return (
    <span className={cn(styles.badge, styles[variant], className)}>
      {children}
    </span>
  );
}
