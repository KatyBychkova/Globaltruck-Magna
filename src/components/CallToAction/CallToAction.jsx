import Link from 'next/link';
import { useState } from 'react';

import { content } from '@/config/index.js';

import styles from './CallToAction.module.css';
import Form from '../Form/Form.jsx';

const { callToAction } = content;
const { title, subtitle } = callToAction;

function CallToAction() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmitted = () => {
        setIsSubmitted(true);
    };
    return (
        <section className={`${styles.section} ${styles.container}`}>
            <div className={styles.wrapper}>
                <div className={styles.text}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.subtitle}>{subtitle}</div>
                </div>
                <Form />
            </div>

        </section>
    );
}

export default CallToAction;
