export default function BodySection({ title, children }) {
  return (
    <div className='bodySection mb-5'>
      <h2 className="font-bold text-xl mt-8">{title}</h2>
      {children}
    </div>
  )
}