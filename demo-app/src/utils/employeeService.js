/**
 * Employee Service utility for handling employee data operations
 */

const mockEmployees = [
  { id: 1, name: 'Alice Smith', department: 'Engineering' },
  { id: 2, name: 'Bob Jones', department: 'Engineering' },
  { id: 3, name: 'Charlie Brown', department: 'HR' },
  { id: 4, name: 'Diana Prince', department: 'Marketing' },
  { id: 5, name: 'Evan Wright', department: 'Engineering' }
];

/**
 * Searches employees by department (GET /employees/search equivalent)
 * @param {string} department - The department name (required)
 * @returns {Array} List of matching employees
 */
export function searchEmployeesByDepartment(department, employees = mockEmployees) {
  if (!department || typeof department !== 'string' || department.trim() === '') {
    throw new Error('Department parameter is required.');
  }
  
  const query = department.trim().toLowerCase();
  return employees.filter(emp => emp.department.toLowerCase() === query);
}
