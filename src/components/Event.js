import React, { Component } from 'react';

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
      <div className="Event">
        {event.description !== undefined
          ? (
            <React.Fragment>
              <div className="Event-title">{event.summary}</div>
              <div className={`details ${isExpanded ? 'is-active': ''}`}>{event.description}</div>
              <button type="button" className="details-btn" onClick={this.handleEventExpand}>Details</button>
            </React.Fragment>
          )
          : ''
        }
      </div>
    );
  }
}

export default Event;