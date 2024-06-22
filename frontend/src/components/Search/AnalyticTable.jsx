import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AnalyticTable({ page }) {
  const searchData = useSelector((state) => state.searchData);
  //   const [changePage, setChangePage] = useState(0);
  const mode = useSelector((state) => state.mode);
  console.log(searchData);
  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      size: 250,
      enableSorting: false,
    },
    {
      accessorKey: "insight",
      header: "Insight",
      size: 250,
    },
    {
      accessorKey: "sector",
      header: "Sector",
      enableSorting: false,
      size: 150,
    },
    {
      accessorKey: "topic",
      header: "Topic",
      size: 150,
    },
    {
      accessorKey: "end_year",
      header: "End Year",
      size: 100,
    },
    {
      accessorKey: "url",
      header: "URL",
      size: 150,
      cell: (info) => <Link to={info.getValue()}>Link</Link>,
    },
  ];

  const table = useReactTable({
    data: searchData?.docs || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div
        style={{
          color: mode === "light" ? "black" : "white",
          backgroundColor: mode === "light" ? "white" : "#1f1f1f",
        }}
        className="w-full shadow-md p-3 rounded-lg my-3"
      >
        <h1 className="text-lg font-semibold">Insights</h1>
      </div>
      <div className="w-full rounded-md border border-slate-300 overflow-auto">
        <table
          className={`w-full ${
            mode === "light" ? "bg-white text-black" : "bg-[#2a2b47] text-white"
          } text-sm`}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border border-slate-500 bg-slate-800 text-white"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`whitespace-nowrap text-left p-3 font-medium`}
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center gap-1"
                            : "flex items-center gap-1"
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-slate-300 cursor-pointer ${
                  mode === "light"
                    ? "hover:bg-purple-50"
                    : "hover:bg-purple-400"
                } ease-in-out duration-200`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`p-3 truncate`}
                    style={{
                      maxWidth: cell.column.getSize(),
                    }}
                  >
                    {cell.column.id === "description"
                      ? flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      : flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!searchData && (
        <div className="w-full rounded-xl border border-dashed border-slate-300 p-4">
          <h1>No Data Available</h1>
        </div>
      )}
    </div>
  );
}

export default AnalyticTable;
