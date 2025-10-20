import { getCurrentYear, getFooterCopy } from '../utils/utils';

export default function Footer() {
  return (
    <div className="App-footer flex justify-center items-center border-t-4 border-[color:var(--main-color)] bottom-0">
      <p className="italic text-xl p-1">Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
    </div>
  )
}
