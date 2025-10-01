
function BodySection({ title, children = null }) {
    return (
        <div className="bodySection">
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export default BodySection;
