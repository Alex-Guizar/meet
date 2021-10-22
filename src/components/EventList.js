// Packages
import React, { Component } from 'react';

// React-Bootstrap Component
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Custom Component
import Event from './Event';

class EventList extends Component {
  render() {
    const { events } = this.props;

    return (
      <Row className="event-list">
        {events.map(event => 
          <Col 
            xs={12} sm={6} lg={4}
            key={event.id}
            className="event-list__col"
          >
            <Event event={event} />
          </Col>  
        )}
      </Row>
    );
  }
}

export default EventList;