import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StaffSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardTimePicker,  MuiPickersUtilsProvider, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Calendar from'react-calendar';
import { List, ListItem, ListItemText } from '@material-ui/core/';

export class FormPersonalDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <AppBar position="absolute" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Make a Booking
              </Typography>
            </Toolbar>
          </AppBar>

          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <br />
            <Typography variant="h6" color="inherit" noWrap>Book From Scratch</Typography>
            <StaffSelect
                placeholder="Select Staff"
                label="Staff"
                onChange={handleChange('staff')}
                value={values.staff}
                margin="normal"
                fullWidth
              >
              <MenuItem value=''>Select Staff</MenuItem>
              {values.staffOptions && 
                values.staffOptions.map((option, index) => (
                        <MenuItem key={index} value={option} >{option}</MenuItem>
                   ))          
               }
            </StaffSelect>
            <br />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker-start"
              label="Start Time"
              value={new Date(values.timeStart)}
              onChange={handleChange('timeStart')}
              KeyboardButtonProps={{ 'aria-label': 'change time', }}
              clearable
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker-end"
              label="End Time"
              value={new Date(values.timeEnd)}
              onChange={handleChange('timeEnd')}
              KeyboardButtonProps={{ 'aria-label': 'change time', }}
              clearable
            />
            </MuiPickersUtilsProvider>  
            <br />
            <Typography>Select Dates</Typography>
            <Typography variant="h6" color="textSecondary"><em>{values.message}</em></Typography>
            <Calendar
              label="Date"
              onChange={handleChange('date')}
              value={new Date(values.date)}
              margin="normal"
              fullWidth
            />
            <br />
            <List>
          {values.allBookings && 
              values.allBookings.map((booking, index) => (
                 <ListItem>
                  <ListItemText primary="Staff" secondary={booking.staff} />
                  <ListItemText primary="Start Time" secondary={booking.timeStart} />
                  <ListItemText primary="End Time" secondary={booking.timeEnd} />
                  <ListItemText primary="date" secondary={booking.date} />
                </ListItem>
              ))          
            }
          </List>
          <br />

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Create Bookings</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormPersonalDetails;
