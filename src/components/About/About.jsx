import { content } from '@/config/index.js';
import Header from '@/components/Header/Header.jsx';

import styles from './About.module.css';

const { about } = content;
const {
    titleBeforeAccent,
    titleAccent,
    titleAfterAccent,
    subtitle,
    description,
} = about;

function About({ openModal, setModal }) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.container}>
                    <Header openModal={openModal} setModal={setModal} />
                    {/* <h1 className={styles.title}>
                        {titleBeforeAccent}
                        <span>
                            {' '}
                            {titleAccent}
                        </span>
                        {titleAfterAccent}
                    </h1>
                    <h3 className={styles.subtitle}>{subtitle}</h3>
                    <div className={styles.description}>
                        {description.map((disc) => (
                            <p key={disc} className={styles.description_part}>
                                {disc}
                            </p>
                        ))}
                    </div> */}
                </div>
            </div>
        </section>
    );
}

export default About;
