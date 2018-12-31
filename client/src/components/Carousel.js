import React from 'react';
import ReactDom from 'react-dom';
import SliderComponent from './SliderComponent';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id
    };
    this.handleSimilarCarSelect = this.handleSimilarCarSelect.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.state.id !== prevState.id) {
      fetch(`/${this.state.id}`)
        .then(res => res.json())
        .then(res => this.setState({ id: this.state.id, images: res, make: res[0].make }));
    }
  }
  componentDidMount() {
    fetch(`/${this.state.id}`)
      .then(res => res.json())
      .then(res => this.setState({ images: res, make: res[0].make }));
  }
  handleSimilarCarSelect(id) {
    this.setState({
      id: id
    });
  }
  render() {
    return (
      <div>
        {this.state.images && (
          <SliderComponent
            images={this.state.images}
            id={this.state.id}
            make={this.state.make}
            similar={this.handleSimilarCarSelect}
          />
        )}
      </div>
    );
  }
}

export default Carousel;
