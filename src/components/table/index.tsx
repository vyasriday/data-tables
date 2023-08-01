import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getFilteredRowModel,
	flexRender,
} from "@tanstack/react-table";
import { useState, useRef, useMemo } from "react";
import { useVirtual } from "react-virtual";

import "./table.scss";
import { ResultItem } from "../../data/results";

type IProps = {
	data: ResultItem[];
};

const Table = ({ data }: IProps) => {
	const [filter, setFilter] = useState<string>("");
	const [pageSize, setPageSize] = useState(50);
	const tableContainerRef = useRef<HTMLDivElement>(null);

	// building columns
	const columns = useMemo(() => {
		const headers = Object.keys(data[0]);
		return headers.map((header) => ({
			header: header.toUpperCase(),
			accessorKey: header,
		}));
	}, [data]);

	// react-table instance
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

	const { rows } = table.getRowModel();
	// react-virtual
	const rowVirtualizer = useVirtual({
		parentRef: tableContainerRef,
		size: rows.length,
	});

	const { virtualItems, totalSize } = rowVirtualizer;
	const paddingTop =
		virtualItems?.length > 0 ? virtualItems?.[0]?.start || 0 : 0;
	const paddingBottom =
		virtualItems?.length > 0 ? totalSize - (virtualItems?.at(-1)?.end || 0) : 0;

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
				<p className='total-records'>Total Records: {data?.length}</p>
			</div>
			<div className='table' ref={tableContainerRef}>
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
						{paddingTop > 0 && (
							<tr>
								<td style={{ height: paddingTop }} />
							</tr>
						)}
						{virtualItems.map((virtualRow) => {
							const row = rows[virtualRow.index];
							return (
								<tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<td key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</td>
										);
									})}
								</tr>
							);
						})}
						{paddingBottom > 0 && (
							<tr className='last'>
								<td style={{ height: paddingBottom }} />
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;
