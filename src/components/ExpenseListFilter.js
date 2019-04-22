import React from 'react';
import { connect } from 'react-redux';
import {setTextFilter,sortByAmout,sortByDate, setEndDate,setStartDate}  from '../actions/filter';
import {DateRangePicker} from 'react-dates';


class ExpenseListFilter extends React.Component {

    state ={
        calendarFocus: null
    }

    onDatesChange = ({startDate,endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }

    onTextFilterChange = (e) => {
        this.props.dispatch(setTextFilter(e.target.value))
    }

    onSortChange = (e) => {
        if(e.target.value==='amount') {
            this.props.dispatch(sortByAmout());
        } else {
            this.props.dispatch(sortByDate());
        }
    }

    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            className="text-input" 
                            type="text" 
                            placeholder="Search Expense"
                            onChange = {this.onTextFilterChange}
                        />
                    </div>
                    <div className="input-group__item">
                        <select className="select" onChange={this.onSortChange}>
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocus}
                            onFocusChange={focusedInput=> this.setState({calendarFocus:focusedInput})}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            showClearDates={true}
                            startDateId="your_unique_start_date_id" 
                            endDateId="your_unique_end_date_id"
                           
                        />
                    </div>
                </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        filters: state.filters
    }
);

export default connect(mapStateToProps)(ExpenseListFilter);