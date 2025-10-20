import { getCurrentYear, getFooterCopy } from '../utils/utils';

export default function Footer() {
  return (
    <div className="App-footer flex justify-center items-center border-t-4 border-[color:var(--main-color)] h-16 mt-auto">
      <p className="italic text-xl">Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
    </div>
  )
}
