import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';


const addexpenseReducer = ({description='',amount=0,note='',createdAt=0}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id : uuid(),
        description,
        amount,
        note,
        createdAt
    }
});

const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpense = (id,updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const setTextFilter = (text='') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmout = () => ({
    type: 'SORT_BY_AMOUNT',
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
});

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

const filterReducer = ( state = filterReducerDefaultState , action ) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filterReducer
    })
);

const getVisibleExpenses = (expenses,{text='',sortBy,startDate,endDate} = {}) => {

    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch =typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1:-1;
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1:-1;
        }
    });
}

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
    console.log(visibleExpenses);
});

const expenseOne =store.dispatch(addexpenseReducer({description:'rent',amount:1000,createdAt:1000}));
const expenseTwo =store.dispatch(addexpenseReducer({description:'coffee',amount:500,createdAt:-1000}));

store.dispatch(editExpense(expenseOne.expense.id,{amount:700}));
// store.dispatch(setTextFilter('Rent'));
// store.dispatch(setTextFilter('Coffee'));

store.dispatch(sortByAmout());
store.dispatch(sortByDate());


// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(125));


const demoState = {
  expenses: [{
    id: 'poijasdfhwer',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};