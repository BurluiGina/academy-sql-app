import React, { useEffect, useState } from 'react';
import { getRoute, routes } from './helper';

export interface FormState {
  name: string;
  city: string;
}

export interface Employee {
  id: number;
  name: string;
  city: string;
}

const App = () => {
  const [form, setForm] = useState<FormState>({ name: '', city: '' });
  const [employees, setEmployees] = useState<Employee[]>([]);

  const getEmployees = async () => {
    const response = await fetch(getRoute(routes.getEmployees));
    const content = await response.json();
    setEmployees(content);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { name, value } = e.target;
    setEmployees((prevState) =>
      prevState.map((employee) => {
        return employee.id === id ? { ...employee, [name]: value } : employee;
      })
    );
  };

  const updateEmployee = async (id: number) => {
    const employee = employees.find((employee) => employee.id === id);
    await fetch(getRoute(routes.updateEmployee), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });

    getEmployees();
  };

  const deleteEmployee = async (id: number) => {
    await fetch(getRoute(routes.deleteEmployee), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    getEmployees();
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const addEmployee = async () => {
    await fetch(getRoute(routes.addEmployee), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    setForm({ name: '', city: '' });
    getEmployees();
  };


  // const createTabels = async () => {
  //   await fetch(getRoute(routes.createTableEmployee), {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // };


  useEffect(() => {
     getEmployees();
  }, []);

  return (
    <div className='App'>
      {/* <button onClick={createTabels}>Create Table</button> */}
      <h1>Employee Management</h1>
      <div>
      <label>Name:</label>
        <input
          type='text'
          name='name'
          value={form.name}
          onChange={handleChange2}
          style={{ marginLeft: '5px', marginRight: '10px' }}
        />
        <label>Location:</label>
        <input
          type='text'
          name='city'
          value={form.city}
          onChange={handleChange2}
          style={{ marginLeft: '5px', marginRight: '10px' }}
        />
        <button onClick={addEmployee}>Add</button>
      </div>
      {employees.map((employee) => {
        console.log(employees);
        return (
          <div key={employee.id}>
            <label>Name:</label>
            <input
              type='text'
              name='name'
              value={employee.name}
              onChange={(event) => handleChange(event, employee.id)}
            />
            <label>Location:</label>
            <input
              type='text'
              name='city'
              value={employee.city}
              onChange={(event) => handleChange(event, employee.id)}
            />
            <button onClick={() => updateEmployee(employee.id)}> Update</button>
            <button onClick={() => deleteEmployee(employee.id)}> Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default App;