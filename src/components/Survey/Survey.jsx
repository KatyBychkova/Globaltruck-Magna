import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { content } from '@/config/index.js';
import surveyBgImage from '@/assets/images/survey-image.png';
import surveySpeedIcon from '@/assets/icons/speed.svg';

import styles from './Survey.module.css';
import Modal from '../Modal/Modal';
import SyrveyQuestions from './SyrveyQuestions';

const { survey, telephoneFormatForLink } = content;
const { surveyContacts, surveyBlock } = survey;
const {
    speed, title, subtitle1, subtitle2, subtitle3,
} = surveyBlock;
const {
    telephoneTitle, telephone, emailTitle, email,
} = surveyContacts;

function Survey() {
    const [isShowModal, setIsShowModal] = useState(false);

    const handleClose = () => {
        setIsShowModal(false);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.survey}>
                        <div className={styles.surveyWrapper}>
                            <div className={styles.text}>
                                <p className={styles.speed}>{speed}</p>

                                <p className={styles.title}>
                                    {title}
                                </p>
                                <div className={styles.subtitles}>
                                    <p className={styles.subtitle}>
                                        {subtitle1}
                                    </p>
                                    <p className={styles.subtitle}>
                                        {subtitle2}
                                    </p>
                                    <p className={styles.subtitle}>
                                        {subtitle3}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.callToAction}>
                                <button
                                    className={styles.callToActionButton}
                                    onClick={() => {
                                        setIsShowModal(true);
                                    }}
                                >
                                    text
                                </button>

                            </div>
                        </div>

                    </div>

                    <div className={styles.imageInner}>
                        <div className={styles.imageWrapper}>
                            <Image
                                alt="карта России"
                                className={styles.image}
                                height={1912}
                                src={surveyBgImage}
                                width={1472}
                                priority
                            />
                        </div>
                    </div>

                </div>
                <div className={styles.contacts}>
                    <div className={styles.telephone}>
                        <div className={styles.telephoneTitle}>
                            {telephoneTitle}
                        </div>

                        <Link
                            className={styles.telephoneLink}
                            href={`tel:${telephoneFormatForLink}`}
                        >
                            {telephone}
                        </Link>

                    </div>
                    <div className={styles.email}>
                        <div className={styles.emailTitle}>
                            {emailTitle}
                        </div>
                        <Link
                            className={styles.emaiLink}
                            href={`mailto:${email}`}
                        >
                            {email}
                        </Link>
                    </div>
                </div>
                <Modal isVisible={isShowModal} onClose={handleClose}>
                    <SyrveyQuestions onClose={handleClose} />
                </Modal>

            </div>
        </section>
    );
}

export default Survey;
