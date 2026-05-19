import { Nav } from './Nav';
import { Footer } from './Footer';
import { ScrollProgress } from './ScrollProgress';
import styles from './Layout.module.css';

export function Layout({ children, noFooter = false }) {
  return (
    <div className={styles.root}>
      <ScrollProgress />
      <Nav />
      <main className={styles.main}>{children}</main>
      {!noFooter && <Footer />}
    </div>
  );
}
