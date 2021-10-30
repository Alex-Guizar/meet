// Packages
import React, { Component } from 'react';

// React-Bootstrap Component
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// Custom Components
import { WarningAlert } from './Alert';

class Event extends Component {
  state = {
    isExpanded: false
  }

  convertDate(date) {
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  handleEventExpand = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  render() {
    const { event } = this.props;
    const { isExpanded } = this.state;
    const eventDate = this.convertDate(new Date(event.start.dateTime));
    const currentDate = this.convertDate(new Date());
    
    return (
      <Card className="event">
        {event.description !== undefined
          ? (
            <Card.Body>
              <Card.Title className="event-title">
                <span>{event.summary}</span>
                <span className="event-title__date">
                  {eventDate === currentDate ?
                    <WarningAlert text='Today' /> :
                    eventDate
                  }
                </span>
              </Card.Title>

              <Card.Text className={`details ${isExpanded ? 'is-active': ''}`}>{event.description}</Card.Text>

              <Button 
                variant="primary"
                className="details-btn"
                onClick={this.handleEventExpand}
              >Details</Button>
            </Card.Body>
          )
          : ''
        }
      </Card>
    );
  }
}

export default Event;