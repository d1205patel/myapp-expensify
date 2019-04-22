import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense,startRemoveExpense } from '../actions/expenses';
import {Link} from 'react-router-dom'; 
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const EditExpensePage = (props) => {

  const onRemoveExpense  = () => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="confirm-alert conent-conatiner">
              <h1>Are you sure?</h1>
              <p>You want to remove this expense?</p>
              <div className="confirm-alert__buttons">
                <button className="button" onClick={onClose}>No</button>
                <button
                  className="button button-secondary"
                  onClick={() => {
                    props.dispatch(startRemoveExpense(props.expense.id)) 
                    onClose();
                    props.history.push('/dashboard');
                  }}
                >
                  Yes, Delete it!
                </button>
              </div>
            </div>
          );
        }
      });
  }

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h2 className="page-header__title">Edit Expenense</h2>
        </div>
      </div>
      <div className="content-container">
        <ExpenseForm 
          expense={props.expense}
          dispatch={props.dispatch}
          onSubmit = {({description='',createdAt=0,amount=0,note=''}) => {
            props.dispatch(startEditExpense(props.expense.id,{description,createdAt,amount,note}))
            props.history.push('/dashboard');
          }}
        />
        <button className="button button-secondary" onClick= {onRemoveExpense}> Remove Expenense </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state,props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

export default connect(mapStateToProps)(EditExpensePage);
