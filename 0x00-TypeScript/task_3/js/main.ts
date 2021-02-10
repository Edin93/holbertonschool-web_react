/// <reference path="./crud.d.ts" />
import { RowElement, RowID } from "./interface";
import * as CRUD from "./crud.js";

const row: RowElement = {
	firstName: 'Guillaume',
	lastName: 'Salva',
}

const newRowID: RowID = CRUD.insertRow(row);

const updatedRow: RowElement = CRUD.updateRow(newRowID, {
	...row,
	age: 23,
});

CRUD.deleteRow(newRowID);
