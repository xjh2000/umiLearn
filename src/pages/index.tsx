import styles from './index.less';
import { Link } from 'umi';

export default function IndexPage() {
    return (
        <div>
            <h1 className={styles.title}>this is home</h1>
            <Link to="/cloudfunc">Go to cloudfunc</Link>
            
        </div>

    );
}
