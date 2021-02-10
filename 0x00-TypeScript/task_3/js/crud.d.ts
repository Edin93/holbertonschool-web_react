import { RowElement, RowID } from "./interface";

type insertRowFunc = (row: RowElement) => RowID;

type deleteRowFunc = (rowId: RowID) => void;

type updateRowFunc = (rowId: RowID, row: RowElement) => RowID;

export {
	insertRowFunc,
	deleteRowFunc,
	updateRowFunc,
}
