import test from 'node:test';
import assert from 'node:assert';
import { searchEmployeesByDepartment } from '../src/utils/employeeService.js';

test('searchEmployeesByDepartment returns matching employees for a valid department', () => {
  const results = searchEmployeesByDepartment('Engineering');
  assert.strictEqual(results.length, 3);
  assert.strictEqual(results[0].name, 'Alice Smith');
  assert.strictEqual(results[1].name, 'Bob Jones');
  assert.strictEqual(results[2].name, 'Evan Wright');
});

test('searchEmployeesByDepartment is case-insensitive', () => {
  const results = searchEmployeesByDepartment('hr');
  assert.strictEqual(results.length, 1);
  assert.strictEqual(results[0].name, 'Charlie Brown');
});

test('searchEmployeesByDepartment throws an error when department parameter is missing or empty', () => {
  assert.throws(() => {
    searchEmployeesByDepartment('');
  }, /Department parameter is required/);

  assert.throws(() => {
    searchEmployeesByDepartment(null);
  }, /Department parameter is required/);
});
