import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const staffMembers = [
  {
  name: "Abraham Lincoln",
  email: "Albina.Ledner@gmail.com",
  sector: "HCA (Care assistant)",
  available: "available",
  image: "https://s3.amazonaws.com/uifaces/faces/twitter/joelhelin/128.jpg",
  },
  {
  name: "Beth Ditto",
  email: "Albina.Ledner@gmail.com",
  sector: "RGN (Nurse)",
  available: "unavailable",
  image: "https://s3.amazonaws.com/uifaces/faces/twitter/joelhelin/128.jpg",
  },
  {
  name: "Jessie James",
  email: "Albina.Ledner@gmail.com",
  sector: "SW (Support Worker)",
  available: "available",
  image: "https://s3.amazonaws.com/uifaces/faces/twitter/joelhelin/128.jpg",
  },
  {
  name: "Lewis Carroll",
  email: "Albina.Ledner@gmail.com",
  sector: "HCA (Care assistant)",
  available: "unavailable",
  image: "https://s3.amazonaws.com/uifaces/faces/twitter/joelhelin/128.jpg",
  },
  {
  name: "Michelle Obama",
  email: "Albina.Ledner@gmail.com",
  sector: "RGN (Nurse)",
  available: "available",
  image: "https://s3.amazonaws.com/uifaces/faces/twitter/joelhelin/128.jpg",
  },
  {
  name: "Janis Joplin",
  email: "Albina.Ledner@gmail.com",
  sector: "SW (Support Worker)",
  available: "unavailable",
  image: "https://s3.amazonaws.com/uifaces/faces/twitter/joelhelin/128.jpg",
  },
];

export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
    console.log(this.props.values.allBookings)
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { allBookings }
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <AppBar position="absolute" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Confirm Your Bookings
              </Typography>
            </Toolbar>
          </AppBar>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
          <Typography variant="h6" color="inherit" noWrap>Bookings To Be Confirmed</Typography>
            <List>

            {allBookings && 
                allBookings.map((booking, index) => (
                  <Card style={{margin: 15}}>
                  <CardContent>
                   <ListItem>
                     <ListItemText primary="Staff" secondary={booking.staff} />
                    <ListItemText primary="Start Time" secondary={booking.timeStart} />
                    <ListItemText primary="End Time" secondary={booking.timeEnd} />
                    <ListItemText primary="date" secondary={booking.date} />
                  </ListItem>
                    <>
                    {staffMembers && 
                        staffMembers.map((staff, index) => (
                          <Typography>{booking.staff === staff.sector && staff.available === 'available' ? staff.name + " is available": false}</Typography>)
                    )}
                    </>
                  </CardContent>
                  </Card>
                ))          
              }
            </List>
            <br />

            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Confirm &amp; Continue</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
