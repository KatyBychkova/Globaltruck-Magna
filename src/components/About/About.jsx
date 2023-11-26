import { content } from '@/config/index.js';
import Header from '@/components/Header/Header.jsx';

import styles from './About.module.css';

const { about } = content;
const {
    title,
    subtitle,
    callToActionOffer,
} = about;
const { offer1, positivePoint, offer2 } = callToActionOffer;

function About({ openModal, setModal }) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.container}>
                    <Header openModal={openModal} setModal={setModal} />

                    <div className={styles.content}>
                        <div className={styles.description}>
                            <div className={styles.descriptionWithTitle}>
                                <h1 className={styles.title}>
                                    {title}
                                </h1>
                                <h2 className={styles.subtitle}>
                                    {subtitle}
                                </h2>
                            </div>
                            <div className={styles.descriptionWithPositivePoint}>
                                <div className={styles.positivePointAllText}>
                                    {offer1}
                                    <p className={styles.positivePoint}>

                                        {positivePoint}
                                    </p>
                                    {offer2}
                                </div>
                                <div className={styles.callToActionButtonWrapper}>
                                    <button
                                        className={styles.callToActionButton}
                                        onClick={() => {
                                            openModal(true);
                                            setModal(modalType);
                                        }}
                                    >
                                        text
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
