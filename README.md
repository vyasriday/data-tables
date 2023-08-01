# Data Tables

Data tables is a small react applications that shows data for a particular SQL query. The SQL queries are predefined.

### Framework Used: React with Typescript

### Tools and Libraries used

1. @tanstack/react-table
2. react-virtual

### App load times and performance

1. The app load time for FCP (First Contentful Paint) and LCP(Largest Contentful Paint) are around 0.8s and 0.9s respectively. I have used Lighthouse to measure these times
2. To improve performance following two optimizations have been done
   - Pagination
   - List Virtualization
