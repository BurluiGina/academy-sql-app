export const ORIGIN_URL = 'http://localhost:3001';

export const routes = {
  createTableEmployee: '/createTableEmployee',
  addEmployee: '/addEmployee',
  getEmployees: '/getEmployees',
  updateEmployee: '/updateEmployee',
  deleteEmployee: '/deleteEmployee',
};

export const getRoute = (route: string) => `${ORIGIN_URL}${route}`;
