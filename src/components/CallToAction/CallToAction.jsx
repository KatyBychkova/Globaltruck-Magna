import { useState } from 'react';

import { content } from '@/config/index.js';

import styles from './CallToAction.module.css';
import ModalSubmitted from '../Modal/ModalSubmitted.jsx';
import Form from './Form.jsx';

const { callToAction } = content;
const { title, subtitle } = callToAction;

function CallToAction() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);

    const handleClose = () => {
        setIsShowModal(false);
    };

    const handleSubmitted = () => {
        setIsSubmitted(true);
        setIsShowModal(true);
    };

    return (
        <section className={`${styles.section} ${styles.container}`}>
            <div className={styles.wrapper}>
                <div className={styles.text}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.subtitle}>{subtitle}</div>
                </div>
                <Form
                    isSubmitted={isSubmitted}
                    onSubmitted={handleSubmitted}
                />
                {isSubmitted && (
                    <ModalSubmitted
                        isVisible={isShowModal}
                        onClose={handleClose}
                    />
                )}
            </div>

        </section>
    );
}

export default CallToAction;
