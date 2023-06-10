import { BASE_INFO, SideBarConfig } from 'renderer/constant';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLayoutEffect, useRef, useState } from 'react';
import Book from 'renderer/icons/book.svg';
import styles from './sidebar.module.scss';
import { gsap } from 'gsap';

const duration = 0.3;
export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [beforeKey, setBeforeKey] = useState(0);
  const lineRef = useRef<HTMLDivElement>(null);


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, { height: '100%', duration: 0 });
    }, lineRef);
    return () => ctx.revert();
  }, []);

  const isActive = (path: string) => path === location.pathname;
  const barAnime = (key: number) => {
    setTimeout(() => {
      const isUp = key > beforeKey;
      const config = isUp ? { top: 0 } : { bottom: 0 };
      setBeforeKey(key);
      gsap.context(() => {
        gsap.fromTo(
          lineRef.current,
          { height: 0, duration, ...config },
          { height: '100%', duration, ...config }
        );
      }, lineRef);
    }, 0);
  };

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
            onClick={() => barAnime(key)}
          >
            {isActive(item.path) && (
              <div className={styles.line} ref={lineRef}></div>
            )}

            <div className={styles.text}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
