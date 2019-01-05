import React from 'react';
import NavBar from './NavBar';
import SliderComponent from './SliderComponent';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
    };
    // this.handleSimilarCarSelect = this.handleSimilarCarSelect.bind(this);
    this.getCarById = this.getCarById.bind(this);
    // this.getRandomSimilarCars = this.getRandomSimilarCars.bind(this);
  }
  componentDidUpdate(prevState) {
    // if (prevState.id !== this.state.id) {
    //   this.setState({ id: this.state.id });
    // }
  }
  componentDidMount() {
    let targetID = window.location.pathname.slice(1, window.location.pathname.length - 1)
    targetID ? this.state.id = targetID : this.state.id = 1;
     

    this.getCarById(this.state.id).then(res =>{
      console.log('getCarById',res)
      this.setState({ 
        id: Number(this.props.id), 
        images: res, 
        make: res[0].make, 
        random: res[0].random,
        // similar: getRandomSimilarCars(res, 7)
      })
    });
  }

  // getRandomSimilarCars(carArray, limit){
  //   let selection = []
  //   let counter = limit;
  //   while(counter > 0){
  //     let random = Math.floor(Math.random() * carArray.length)
  //     if(selection.indexOf(carArray[random]._id) < 0){
  //       carArray[random].forEach(image => if())
  //     }
  //     counter--
  //   }
  //   console.log('SELECTION',selection)
  //   return selection;
  // }
  getCarById(id) {
    return fetch(`/api/turash/images/${id}`)
      .then(res => (res.ok ? res : new Error('ERROR fetching car by id')))
      .then(res => {return res.json()});
  }
  // handleSimilarCarSelect(id) {
  //   console.log('ID', id);
  //   // this.setState({
  //   //   id: id
  //   // });
  // }
  render() {
    return (
      <div>
        <NavBar />
        {this.state.images && (
          <SliderComponent
            images={this.state.images}
            id={this.state.id}
            make={this.state.make}
            similar={this.handleSimilarCarSelect}
            random={this.state.random}
          />
        )}
      </div>
    );
  }
}

export default Carousel;
