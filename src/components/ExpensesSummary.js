import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expense-total';
import numeral from 'numeral';

const rupee = '\u20B9';

const ExpensesSummary = ({ expenseCount, expensesTotal, notShowingExpenseCount}) => {

  return (
    <div className="page-header">
      <div className="content-container">
        <h2 className="page-header__title">
          Viewing <span>{expenseCount}</span> expenses totalling <span>{rupee}{numeral(expensesTotal/100).format('0,0.00')}</span>
        </h2>
        {
          notShowingExpenseCount === 0 
            ? (<div>Viewing all expense</div>) 
            : (<div>Not showing {notShowingExpenseCount} expenses because of the filters</div>)
        }
        <div className="page-header__actions">
          <Link className="" to="/create"><button className="button"> Add Expense </button> </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses),
    notShowingExpenseCount: state.expenses.length - visibleExpenses.length
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
