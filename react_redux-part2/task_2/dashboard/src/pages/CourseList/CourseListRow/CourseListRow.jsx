export default function CourseListRow({
    isHeader = false,
    textFirstCell = '',
    textSecondCell = null,
    id,
    isSelected,
    onChange
}) {
    const handleCheckboxChange = (e) => {
        onChange(id, e.target.checked);
    };

    return (
        isHeader ? (
            <tr>
                <th colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
                {textSecondCell ? <th>{textSecondCell}</th> : null}
            </tr>
        ) : (
            <tr>
                <td>{textFirstCell}</td>
                <td>{textSecondCell}</td>
                <td>
                    <input 
                        type="checkbox" 
                        checked={isSelected} 
                        onChange={handleCheckboxChange} 
                    />
                </td>
            </tr>
        )
    );
};
