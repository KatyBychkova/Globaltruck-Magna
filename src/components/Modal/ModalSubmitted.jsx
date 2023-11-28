'use client';

import CrossIcon from '../../assets/icons/cross.svg';
import SubmitIcon from '../../assets/icons/submit.svg';
import CloseButton from './CloseButton.jsx';
import styles from './ModalSubmitted.module.css';

const modalSubmitted = ({ onClose }) => (
    <div className={styles.container}>
        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
            <div className={styles.content}>
                <div className={styles.icon_wrapper}>
                    <SubmitIcon height="50" />
                </div>
                <div className={styles.text}>
                    Спасибо! Данные успешно отправлены!
                </div>
                <div className={styles.close_btn}>
                    <CloseButton onClose={onClose}>
                        <CrossIcon className={styles.closeCross} />
                    </CloseButton>
                </div>
            </div>
        </div>
    </div>
);

export default modalSubmitted;
