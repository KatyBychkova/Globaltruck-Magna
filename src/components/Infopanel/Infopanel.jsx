import Link from 'next/link';

import { content } from '@/config/index.js';

import styles from './InfoPanel.module.css';

const { infoPanel } = content;
const { terms, developedBy, copy } = infoPanel;

function InfoPanel() {
    return (
        <section className={`${styles.section} ${styles.container}`}>
            <div className={styles.wrapper}>
                <div className={styles.terms}>{terms}</div>

                <div className={styles.developedBy}>
                    <Link
                        className={styles.developedByLink}
                        href={developedBy.href}
                        target="_blank"
                    >
                        {developedBy.name}
                    </Link>
                </div>
                <div className={styles.copy}>{copy}</div>
            </div>
        </section>
    );
}

export default InfoPanel;
