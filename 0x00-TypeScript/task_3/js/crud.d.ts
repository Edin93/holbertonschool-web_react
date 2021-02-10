import { RowElement, RowID } from './interface';

type insertRow = (row: RowElement) => number;

type deleteRow = (rowId: RowID) => void;

type updateRow = (rowId: RowID, row: RowElement) => number;

export {
	insertRow,
	deleteRow,
	updateRow,
}
