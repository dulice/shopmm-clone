import { compareItems } from "@tanstack/match-sorter-utils";
import { createColumnHelper, sortingFns } from "@tanstack/react-table";
import { customers } from "./customers";

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank
    );
  }
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const columnHelper = createColumnHelper();
const columns = (thead) => {
  return thead.map((column) =>
    columnHelper.accessor(column, {
      cell: (info) => info.getValue(),
      filterFn: "fuzzy",
      sortingFn: fuzzySort,
    })
  );
};
// const columns = [
//     columnHelper.accessor('id', {
//         cell: info => info.getValue(),
//         filterFn: 'fuzzy',
//         sortingFn: fuzzySort
//     }),
//     columnHelper.accessor('customer_name', {
//         cell: info => info.getValue(),
//         filterFn: 'fuzzy',
//         sortingFn: fuzzySort
//     }),
//     columnHelper.accessor('customer_email', {
//         cell: info => info.getValue(),
//         filterFn: 'fuzzy',
//         sortingFn: fuzzySort
//     }),
//     columnHelper.accessor('country', {
//         cell: info => info.getValue(),
//         filterFn: 'fuzzy',
//         sortingFn: fuzzySort
//     }),
//     columnHelper.accessor('invoice_amount', {
//         cell: info => info.getValue(),
//         filterFn: 'fuzzy',
//         sortingFn: fuzzySort
//     }),
// ]
export { columns };
