Employee Management System
 
This web app includes: 
1. Basic CRUD operations and validations are done on a list of employees.
2. Authentication and authorization using JWT token.
3. Users can download the list of employees in PDF, Excel and CSV format.
4. Users can perform search and sort operations on the list of employees.
5. There are basically two roles EMPLOYEE and ADMIN based on their roles certain features are exclusive.
6. Upon five failed login attempts account gets locked for a certain period of time.
7. User with ADMIN role gets notifications when ever an admin addes, deletes or update their detials.
8. User with EMPLOYEE role gets notifications when ever their details get updated.
9. Every user who as logged in gets real time data i.e. When ever there is some change in employees data it gets updated everywhere with out refreshing the page 
   This is done using Server Sent Events(SSE). This is also used in implementing notifications. 
10. Pagination is implemented on the list of employees. 
11. Users can delete multiple employees at the same time. 
12. Users can perform inline updation and inline addition 
 
In this web app I used spring boot for backend, angular for frontend and mongodb for database. 
 
 
 
