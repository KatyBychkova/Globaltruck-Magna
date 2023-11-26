import styles from '@/components/Footer/Footer.module.css';
import { content } from '@/config/index.js';

const { footer } = content;
const { copy } = footer;

function Footer() {
    return (
        <footer className={styles.section}>
            <div className={styles.container}>

                <div className={styles.copy}>{copy}</div>

            </div>
        </footer>
    );
}

export default Footer;
