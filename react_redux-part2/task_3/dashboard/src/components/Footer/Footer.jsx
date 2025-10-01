import { useSelector } from 'react-redux';
import { getCurrentYear, getFooterCopy } from '../../utils/utils';
import './Footer.css';

export default function Footer() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    return (
        <div className="App-footer">
            <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
            {isLoggedIn && <a href="#">Contact us</a>}
        </div>
    );
}
