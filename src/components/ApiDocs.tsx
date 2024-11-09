import React from 'react';
import { Code } from 'lucide-react';

export function ApiDocs() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">API Documentation</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Employee Endpoints</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-green-500 text-white rounded text-sm">GET</span>
                <code className="ml-2">/api/employees</code>
              </div>
              <p className="text-sm text-gray-600">Get all employees</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-green-500 text-white rounded text-sm">GET</span>
                <code className="ml-2">/api/employees/:id</code>
              </div>
              <p className="text-sm text-gray-600">Get employee by ID</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-blue-500 text-white rounded text-sm">POST</span>
                <code className="ml-2">/api/employees</code>
              </div>
              <p className="text-sm text-gray-600">Create new employee</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-yellow-500 text-white rounded text-sm">PUT</span>
                <code className="ml-2">/api/employees/:id</code>
              </div>
              <p className="text-sm text-gray-600">Update employee</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Record Endpoints</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-green-500 text-white rounded text-sm">GET</span>
                <code className="ml-2">/api/records/employee/:employeeId</code>
              </div>
              <p className="text-sm text-gray-600">Get all records for an employee</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-blue-500 text-white rounded text-sm">POST</span>
                <code className="ml-2">/api/records</code>
              </div>
              <p className="text-sm text-gray-600">Create new record (leave, overtime, bonus, deduction)</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Salary Endpoints</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-green-500 text-white rounded text-sm">GET</span>
                <code className="ml-2">/api/salaries/month/:month</code>
              </div>
              <p className="text-sm text-gray-600">Get salary calculations for a specific month</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-blue-500 text-white rounded text-sm">POST</span>
                <code className="ml-2">/api/salaries/calculate</code>
              </div>
              <p className="text-sm text-gray-600">Calculate salary for an employee</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="px-2 py-1 bg-green-500 text-white rounded text-sm">GET</span>
                <code className="ml-2">/api/salaries/report</code>
              </div>
              <p className="text-sm text-gray-600">Generate salary report for a period</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">API Testing</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Code className="h-5 w-5 text-gray-600 mr-2" />
              <span className="font-medium">Base URL:</span>
              <code className="ml-2">http://localhost:3000/api</code>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Use tools like Postman or cURL to test the API endpoints. All endpoints return JSON responses
              and accept JSON request bodies where applicable.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}