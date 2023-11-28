import { useState } from 'react';

import { content } from '@/config/index.js';
import Header from '@/components/Header/Header.jsx';

import styles from './About.module.css';
import Form from '../Form/Form.jsx';
import Modal from '../Modal/Modal.jsx';

const { about } = content;
const {
    title,
    subtitle,
    callToActionOffer,
} = about;
const { offer1, positivePoint, offer2 } = callToActionOffer;

function About() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);

    const handleClose = () => {
        setIsShowModal(false);
    };

    const handleSubmitted = () => {
        setIsSubmitted(true);
        setIsShowModal(false);
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.container}>
                    <Header />

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
                                            setIsShowModal(true);
                                        }}
                                    >
                                        text
                                    </button>
                                </div>
                                <Modal isVisible={isShowModal} onClose={handleClose}>
                                    <Form
                                        isSubmitted={isSubmitted}
                                        onSubmitted={handleSubmitted}
                                    />
                                </Modal>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
