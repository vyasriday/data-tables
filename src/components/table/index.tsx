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
	const [pageSize, setPageSize] = useState(10);
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
			<div className='table-controls'>
				<div className='pagination'>
					<button className='btn' onClick={() => table.setPageIndex(0)}>
						1
					</button>
					<button
						className='btn'
						disabled={!table.getCanPreviousPage()}
						onClick={() => table.previousPage()}
					>
						Previous
					</button>
					<button
						className='btn'
						disabled={!table.getCanNextPage()}
						onClick={() => table.nextPage()}
					>
						Next
					</button>
					<button
						className='btn'
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					>
						{table.getPageCount() - 1}
					</button>
					<select
						value={pageSize}
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
							setPageSize(Number(e.target.value));
							table.setPageSize(Number(e.target.value));
						}}
					>
						<option value={10}>10</option>
						<option value={100}>100</option>
						<option value={500}>500</option>
						<option value={data.length}>All rows</option>
					</select>
				</div>
				<input
					type='search'
					value={filter}
					placeholder='Search data in table'
					onChange={(e) => setFilter(e.target.value)}
				/>
				{/* <p className='total-records'>Total Records: {data.length}</p> */}
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
