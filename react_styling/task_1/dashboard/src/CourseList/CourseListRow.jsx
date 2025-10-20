export default function CourseListRow({ 
  isHeader = false, 
  textFirstCell = '', 
  textSecondCell = null 
}) {
  return (
    <tr className={isHeader ? "bg-[color:theme(--color-table-header)]/45" : "bg-[color:theme(--color-table-rows)]/66"}>
      {isHeader ? (
        <>
          <th className="border border-gray-400" colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
          {textSecondCell && <th className="border border-gray-400">{textSecondCell}</th>}
        </>
      ) : (
        <>
          <td className="border border-gray-400 pl-2">{textFirstCell}</td>
          <td className="border border-gray-400 pl-2">{textSecondCell}</td>
        </>
      )}
    </tr>
  )
}
