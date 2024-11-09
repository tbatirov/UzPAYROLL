import React from 'react';

export function Documentation() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">HR Manager Documentation</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Employee Management</h2>
          <div className="prose">
            <ul className="list-disc pl-5 space-y-2">
              <li>Add new employees with detailed information including personal details and contract terms</li>
              <li>Import employees from Excel files using the provided template</li>
              <li>Manage employee records including leaves, overtime, bonuses, and deductions</li>
              <li>Track leave balances for different types of leaves</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Salary Calculations</h2>
          <div className="prose">
            <ul className="list-disc pl-5 space-y-2">
              <li>Calculate monthly salaries based on employee records</li>
              <li>Automatic deduction of pension fund (1%)</li>
              <li>Handle overtime payments with configurable rates</li>
              <li>Process various types of leaves with different pay conditions</li>
              <li>Export salary reports to Excel</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Leave Management</h2>
          <div className="prose">
            <ul className="list-disc pl-5 space-y-2">
              <li>Track different types of leaves:
                <ul className="list-disc pl-5 mt-2">
                  <li>Annual vacation</li>
                  <li>Sick leave</li>
                  <li>Marriage leave</li>
                  <li>Bereavement leave</li>
                  <li>Paternity/Maternity leave</li>
                  <li>Study leave</li>
                  <li>Military service</li>
                  <li>Unpaid leave</li>
                </ul>
              </li>
              <li>Automatic balance calculation and validation</li>
              <li>Leave history tracking</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Validation</h2>
          <div className="prose">
            <ul className="list-disc pl-5 space-y-2">
              <li>PINFL validation (14 digits)</li>
              <li>Passport validation (2 letters + 7 digits)</li>
              <li>Date validations for all date fields</li>
              <li>Leave balance validation</li>
              <li>Salary calculation validation</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}