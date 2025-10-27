export default function BodySection({ title, children }) {
  return (
    <div className='bodySection max-w-full'>
      <h2 className="font-bold text-xl mt-8">{title}</h2>
      <div className="max-w-full overflow-hidden">
        {children}
      </div>
    </div>
  )
}
