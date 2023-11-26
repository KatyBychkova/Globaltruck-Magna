import Link from 'next/link';

import { content } from '@/config/index.js';

import styles from './Header.module.css';
import GlobaltrackLogoIcon from '../../assets/logo/globaltruck.svg';
import MagnaLogoIcon from '../../assets/logo/magna.svg';

const { telephoneFormatForLink, header } = content;
const { telephone } = header;
// const modalType = 'modalForm';

function Header({ openModal, setModal }) {
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
                                        openModal(true);
                                        setModal(modalType);
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
        </header>
    );
}

export default Header;
