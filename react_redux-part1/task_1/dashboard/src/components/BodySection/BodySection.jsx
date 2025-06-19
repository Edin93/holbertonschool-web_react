export default function BodySection({ title, children }) {
    return (
        <div className='bodySection'>
            <h2>{title}</h2>
            {children}
        </div>
    )
}
