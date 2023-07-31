import "./App.scss";
import { useState } from "react";
import Header from "./components/header/Header";
import { query as Query } from "./data/query.js";
import { results as Results, ResultItem } from "./data/results.js";
import Table from "./components/table";

function App() {
	const [selectQuery, setSelectQuery] = useState<string>("students");
	const [sqlQuery, setSQLQuery] = useState<string>(Query[selectQuery]);
	const [data, setData] = useState<ResultItem[]>(Results[selectQuery]);

	function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setData(Results[selectQuery]);
	}
	return (
		<div className='main'>
			<Header />
			<div className='query-container'>
				<form onSubmit={onSubmit}>
					<label>Select Query to Run</label>
					<select
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
							setSelectQuery(e.target.value);
							setSQLQuery(Query[e.target.value]);
						}}
						value={selectQuery}
					>
						<option value='students'>Students</option>
						<option value='products'>Products</option>
						<option value='orders'>Orders</option>
						<option value='customers'>Customers</option>
					</select>
					<textarea
						placeholder='Enter your SQL Query'
						value={sqlQuery}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							setSQLQuery(e.target.value)
						}
					/>
					<button className='btn' type='submit'>
						Run Query
					</button>
				</form>
			</div>
			<div className='result-container'>
				{data.length > 0 && <Table data={data} />}
			</div>
		</div>
	);
}

export default App;
