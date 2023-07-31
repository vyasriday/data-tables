interface Query {
	[k: string]: string;
}
export const query: Query = {
	students: "SELECT * FROM STUDENTS",
	products: "SELECT * FROM PRODUCTS",
	customers: "SELECT * FROM CUSTOMERS",
	orders: "SELECT * FROM ORDERS",
};
