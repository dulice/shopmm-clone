import React, { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ReactPaginate from "react-paginate";
import { rankItem } from "@tanstack/match-sorter-utils";
import { TbArrowDown, TbArrowUp } from "react-icons/tb";
import { BiSort } from "react-icons/bi";
import { useSelector } from "react-redux";
import { CustomButton } from "../../custom";
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

const Table = ({ columns, data, itemPerpage = 10 }) => {
  const { device } = useSelector((state) => state.toggle);
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    columns: useMemo(() => columns, []),
    data,
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  useEffect(() => {
    table.setPageSize(itemPerpage);
  }, []);
  return (
    <>
      <input
        type="text"
        className="input mb-4"
        placeholder="Search"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <div className="relative overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-primary-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="p-4" key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {
                            {
                              asc: (
                                <TbArrowUp className="inline-block text-white ms-2" />
                              ),
                              desc: (
                                <TbArrowDown className="inline-block text-white ms-2" />
                              ),
                            }[header.column.getIsSorted() ?? null]
                          }
                          {header.column.getSortIndex() === -1 && (
                            <BiSort className="inline-block text-white ms-2" />
                          )}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover">
                {row.getVisibleCells().map((cell) => (
                  <td className="px-4 py-2 whitespace-nowrap" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {device === "mobile" ? (
          <div className="flex justify-center">
            <CustomButton
              onClick={() => table.previousPage()}
              title={"<"}
              variant="btn"
            />
            <CustomButton
              onClick={() => table.nextPage()}
              title={">"}
              variant="btn"
            />
          </div>
        ) : (
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            pageCount={data.length / itemPerpage}
            pageRangeDisplayed={1}
            onPageChange={(e) => table.setPageIndex(e.selected)}
            activeLinkClassName="bg-secondary-100 text-white"
            pageLinkClassName="px-4 py-2"
            containerClassName="flex justify-center gap-2 my-4"
            previousLinkClassName="px-4 py-2"
            nextLinkClassName="px-4 py-2"
          />
        )}
      </div>
    </>
  );
};

export default Table;
