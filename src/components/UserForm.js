import React, { Component } from 'react';
import FormBookingDetails from './FormBookingDetails';
import Confirm from './Confirm';
import Success from './Success';

import { fetchGrades } from '../services/api';

export class UserForm extends Component {
  state = {
    step: 1,
    staff: [],
    staffOptions: [],
    timeStart: 'January 01, 2021 09:30:00',
    timeEnd: 'January 01, 2021 17:30:00',
    date: 'January 01, 2021 17:30:00',
    allBookings: [],
    message: 'Select a date to add booking',
    bookings: [{
      staff: '',
      timeStart: '',
      timeEnd: '',
      date: '',
    }]
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    const { state } = this.state;
    switch (input) {
      case 'staff':
        return (
          this.setState({ 
            ...state,
            [input]: e.target.value,
            bookings: [{
              timeStart: this.state.timeStart,
              timeEnd: this.state.timeEnd,
              [input]: e.target.value,
            }]
          })
        );
      case 'timeStart':
        let [hour, minute] = e.toLocaleTimeString("en-GB").split(/:| /);
        return (
          this.setState({ 
            ...state,
            [input]: e,
            bookings: [{
              staff: this.state.staff,
              [input]: hour + ":" + minute,
            }]
          })
        );
        case 'timeEnd':
          let [endHours, endMinutes] = e.toLocaleTimeString("en-GB").split(/:| /);
          let [h , m] = this.state.timeStart.toLocaleTimeString("en-GB").split(/:| /);
          return (
            this.setState({ 
              ...state,
              [input]: e,
              bookings: [{
                staff: this.state.staff,
                timeStart: h + ":" + m,
                [input]: endHours + ":" + endMinutes,
              }]
            })
          );
      case 'date':
        if (this.state.timeStart !== 'January 01, 2021 09:30:00' 
        && this.state.timeEnd !== 'January 01, 2021 09:30:00') {
          let [sHours, sMins] = this.state.timeStart.toLocaleTimeString("en-GB").split(/:| /);
          let [eHours, eMins] = this.state.timeEnd.toLocaleTimeString("en-GB").split(/:| /);
          let [month, date, year] = e.toLocaleDateString("en-US").split("/");
        return (
          this.setState({ 
            allBookings: [
            ...this.state.allBookings, 
            {
            staff: this.state.staff,
            timeStart: sHours + ":" + sMins,
            timeEnd: eHours + ":" + eMins,
            [input]: date + "/" + month + "/" + year,
            }
          ]
        })
      );
      } else {
        return (
          this.setState({ 
            ...state,
            message: "please enter all fields before choosing a date",
          })
        );
      }

      default:
        (console.log('This is a two-step form built with React.'))
    }
  };

  getStaff = async () => {
    await fetchGrades()
    .then((res) => { 
      this.setState({
        staffOptions: res.data.grades,
        }) 
    })
    .catch((error) => {
      console.log(error)
    })
    .finally({
      //set Loading here.
    })
    };

    componentDidMount(){
      if (this.state.step === 1) {
      this.getStaff();
      }
    }

  render() {
    const { step } = this.state;
    const { staff, staffOptions, timeStart, timeEnd, date, bookings, selectedDates, beenBefore, allBookings, message } = this.state;
    const values = { staff, staffOptions, timeStart, timeEnd, date, bookings, selectedDates, beenBefore, allBookings, message };

    switch (step) {
      case 1:
        return (
          <FormBookingDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 3:
        return <Success />;
      default:
        (console.log('This is a two-step form built with React.'))
    }
  }
}

export default UserForm;
