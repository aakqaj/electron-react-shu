import { BASE_INFO, SideBarConfig } from 'renderer/constant';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';
import Book from 'renderer/icons/book.svg';
import styles from './sidebar.module.scss';
import { gsap } from 'gsap';
export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const lineRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => path === location.pathname;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, { rotation: 360 });

    }, lineRef); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <img src={`${Book}`} width={24} alt="" />
        <h3>{BASE_INFO.appName}</h3>
      </div>

      <div className={styles.bar}>
        {SideBarConfig.map((item, key) => (
          <div
            className={`${styles.card} ${isActive(item.path) && styles.active}`}
            key={key}
            onClickCapture={() => navigate(item.path)}
          >
            <div className={styles.line} ref={lineRef}></div>
            <div className={styles.text}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
