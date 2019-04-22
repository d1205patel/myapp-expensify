import React from 'react';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';
import { connect } from 'react-redux';


const AddExpensePage = (props) => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h2 className="page-header__title">Add Expense</h2>
      </div>
    </div>
    <div className="content-container">
      <ExpenseForm
        expense={{}}
        onSubmit={(expense) => {
          props.dispatch(startAddExpense(expense));
          props.history.push('/dashboard');
        }}
      />
    </div>
  </div>
);

export default connect()(AddExpensePage);
