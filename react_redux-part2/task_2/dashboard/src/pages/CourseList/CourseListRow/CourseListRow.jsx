import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545'
  },
  row: {
    backgroundColor: '#f5f5f5ab'
  }
});

export default function CourseListRow({ 
  isHeader = false, 
  textFirstCell = '', 
  textSecondCell = null,
  isSelected = false,
  onChangeRow = () => {},
  id,
}) {

  const rowStyle = isHeader ? styles.headerRow : styles.row;

  return (
    isHeader ? (
      <tr className={css(rowStyle)}>
        <th colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
        {textSecondCell ? <th>{textSecondCell}</th> : null}
      </tr>
    ) : (
      <tr className={css(rowStyle)}>
        <td>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onChangeRow(id, e.target.checked)}
          />
          {textFirstCell}
        </td>
        <td>{textSecondCell}</td>
      </tr>
    )
  )
}
