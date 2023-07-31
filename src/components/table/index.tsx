import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getFilteredRowModel,
	flexRender,
} from "@tanstack/react-table";
import { useState } from "react";

import "./table.scss";
import { ResultItem } from "../../data/results";

type IProps = {
	data: ResultItem[];
};

const Table = ({ data }: IProps) => {
	const [filter, setFilter] = useState<string>("");
	const [pageSize, setPageSize] = useState(50);
	// building headers
	const headers = Object.keys(data[0]);
	const columns = headers.map((header) => ({
		header: header.toUpperCase(),
		accessorKey: header,
	}));

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			globalFilter: filter,
		},
		onGlobalFilterChange: setFilter,
	});
	return (
		<div className='table-container'>
			<input
				type='search'
				value={filter}
				placeholder='Search data in table'
				onChange={(e) => setFilter(e.target.value)}
			/>
			<div className='pagination'>
				<button onClick={() => table.setPageIndex(0)}>First page</button>
				<button
					disabled={!table.getCanPreviousPage()}
					onClick={() => table.previousPage()}
				>
					Previous page
				</button>
				<button
					disabled={!table.getCanNextPage()}
					onClick={() => table.nextPage()}
				>
					Next page
				</button>
				<button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
					Last page
				</button>
				<select
					value={pageSize}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
						setPageSize(+e.target.value);
						table.setPageSize(+e.target.value);
					}}
				>
					<option>Per page</option>
					<option value='10'>50</option>
					<option value='50'>100</option>
					<option value='100'>500</option>
					<option value={data.length}>All rows</option>
				</select>
			</div>
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									onClick={() => header.column.getToggleSortingHandler()}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
