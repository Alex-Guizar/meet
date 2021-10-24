// Packages
import React, { Component } from 'react';

// React-Bootstrap Component
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Event extends Component {
  state = {
    isExpanded: false
  }

  handleEventExpand = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  render() {
    const { event } = this.props;
    const { isExpanded } = this.state;
    
    return (
      <Card className="event">
        {event.description !== undefined
          ? (
            <Card.Body>
              <Card.Title className="event-title">{event.summary}</Card.Title>

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