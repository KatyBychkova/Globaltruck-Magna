import Link from 'next/link';
import { useState } from 'react';

import { content } from '@/config/index.js';

import styles from './Header.module.css';
import GlobaltrackLogoIcon from '../../assets/logo/globaltruck.svg';
import MagnaLogoIcon from '../../assets/logo/magna.svg';
import Modal from '../Modal/Modal.jsx';
import ModalForm from '../ModalForm/ModalForm.jsx';

const { telephoneFormatForLink, header, afterSubmitText } = content;
const { telephone } = header;

function Header() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);

    const handleClose = () => {
        setIsShowModal(false);
    };

    const handleSubmitted = () => {
        setIsSubmitted(true);
    };
    return (
        <header className={styles.section}>
            <div className={styles.inner}>

                <div className={styles.wrapper}>

                    <div className={styles.logosWrapper}>
                        <div className={styles.logo1}>
                            <MagnaLogoIcon height="40" />
                        </div>
                        <div className={styles.logo2}>
                            <GlobaltrackLogoIcon height="40" />
                        </div>

                    </div>

                    <div className={styles.contactWrapper}>

                        <div className={styles.callToAction}>
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
                        </div>
                        <div className={styles.telephone}>
                            <Link
                                className={styles.telephoneLink}
                                href={`tel:${telephoneFormatForLink}`}
                            >
                                {telephone}
                            </Link>
                        </div>
                    </div>

                </div>

            </div>
            <Modal isVisible={isShowModal} onClose={handleClose}>
                {!isSubmitted ? (
                    <ModalForm
                        isSubmitted={isSubmitted}
                        onSubmitted={handleSubmitted}
                    />
                ) : (
                    <div className={styles.afterSubmitContainer}>
                        <div className={styles.afterSubmit}>
                            <div className={styles.afterSubmitText}>
                                {afterSubmitText}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </header>
    );
}

export default Header;
