import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css'

export default class ExpenseForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            description: props.expense.description ? props.expense.description : '',
            note: props.expense.note ? props.expense.note : '',
            amount: props.expense.amount ? (props.expense.amount/100).toString() : '',
            createdAt: props.expense.createdAt ? moment(props.expense.createdAt): moment(),
            calendarFocused: false,
            error: undefined
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ( {description} ));
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(()=> ({note}));
    }

    onAmountChange = (e) => {
        const amount = e.target.value;
        if(amount.match( /^\d*(\.\d{0,2})?$/)) {
            this.setState(() => ( {amount} ));
        }
    }

    onDateChange = (createdAt) => {
    this.setState(() => ({ createdAt }));
    };

    onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
    };

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description || !this.state.amount) {
            this.setState(()=> ({error:'Please add Amount and Description !'}));
        } else {
            this.setState(()=> ({error:undefined}));
            this.props.onSubmit({
                description:this.state.description,
                amount: parseFloat(this.state.amount)*100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };

    render() {
        return (
                <form className="form" onSubmit={this.onSubmit}>
                    { this.state.error && <p className="form-error">{this.state.error}</p> }
                    <input 
                        className="text-input"
                        type="text" 
                        value={this.state.description}
                        placeholder="Description" 
                        autoFocus 
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        className="text-input"
                        type="text"
                        value={this.state.amount} 
                        placeholder="Amount" 
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt} 
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused} 
                        onFocusChange={this.onFocusChange} 
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea 
                        className="textarea"
                        value={this.state.note}
                        placeholder="Add note for your expense(optional)" 
                        onChange={this.onNoteChange} 
                    />
                    <div>
                        <button className="button">Save Expense</button> 
                    </div>
                </form>
        );
    }
}