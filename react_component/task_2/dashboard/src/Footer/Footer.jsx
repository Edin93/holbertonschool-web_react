import { getCurrentYear, getFooterCopy } from '../utils/utils.js'
import './Footer.css';

function Footer() {
    return (
        <div className="App-footer">
            <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
        </div>
    );
}

export default Footer;
