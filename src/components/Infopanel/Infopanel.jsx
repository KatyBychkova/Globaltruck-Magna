import Link from 'next/link';

import { content } from '@/config/index.js';

import styles from './Infopanel.module.css';

const { infopanel } = content;
const { terms, developedBy, copy } = infopanel;

function Infopanel() {
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

export default Infopanel;
