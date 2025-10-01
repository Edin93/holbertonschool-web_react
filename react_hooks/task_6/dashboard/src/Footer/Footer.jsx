import './Footer.css';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

export default function Footer({ user }) {
  return (
    <div className="App-footer">
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      {user.isLoggedIn && <a href="#">Contact us</a>}
    </div>
  );
}
