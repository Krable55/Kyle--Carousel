import React from 'react';
import Slider from 'react-slick';

class SliderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      images: this.props.images,
      activeSlide: 0,
      activeSlide2: 0,
      similar: [],
      random: this.props.random
    };
    this.getSimilarCarsByMake = this.getSimilarCarsByMake.bind(this);
  }
  componentDidUpdate() {
    console.log('updated')
  }
  // }

  componentDidMount() {

    console.log(this.props.make)
    console.log('Slider mounted', this.props.make)
    this.getSimilarCarsByMake(this.props.make, 7).then(res => console.log( res))
    // this.getVariety(this.props.make, 1);
  }

  //get similar cars for second  carousel
  getSimilarCarsByMake(type, limit) {
    return fetch(`http://localhost:3004/api/turash/images/similar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ make: type, limit: limit })
    })
      .then(res => (res.ok ? res : new Error('ERROR fetching similar cars by make')))
      .then(res => res.json())
      .then(res => {
        console.log('GET SIMILAR', res);
      })
  }

  //Get randomly selected images from other makes of car
  // getVariety(type, limit) {
  //   return fetch(`http://localhost:3004/api/turash/images/varied`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ make: type, limit: limit })
  //   })
  //     .then(res => (res.ok ? res : new Error('ERROR fetching similar cars by make')))
  //     .then(res => res.json())
  //     .then(res => {
  //       let test = [];
  //       console.log('VARIETY', res);
  //       res.forEach(car => {
  //         let random = Math.floor(Math.random() * car.images.length);
  //         let info = car.images[random].split('/').slice(4, 6);
  //         test.push({
  //           Key: info[1],
  //           id: info[0],
  //           make: car._id,
  //           url: car.images[random]
  //         });
  //       });
  //       return test;
  //     })
  //     .then(test => this.setState({ similar: test }));
  // }
  render() {
    console.log(this.state.random)
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      initialSlide: 0,
      adaptiveHeight: false,
      slidesToScroll: 1
      // beforeChange: (current, next) => this.setState({ activeSlide: next }),
      // afterChange: current => this.setState({ activeSlide2: current })
    };
    const similarSliderSettings = {
      infinite: true,
      adaptiveHeight: true,
      speed: 500,
      slidesToScroll: 3,
      slidesToShow: 3,
      swipeToSlide: true,
      focusOnSelect: true
    };
    return (
      <div>
        <div id="mainSliderContainer">
          <Slider {...settings}>
            {this.state.images
              ? this.state.images.map((image, i) => (
                 image.url && <div key={i}> <img src={image.url} /> </div>
                ))
              : null}
          </Slider>
        </div>
        <div className="similarTitle">
          <h1>You may also like...</h1>
        </div>
        <div className="slider slider-nav" id="similar">
          <Slider {...similarSliderSettings}>
            {this.state.random.length > 0 &&
              this.state.random.map((randomCar, i) => (
                <div className="similarSlide" key={i}>
                {console.log(randomCar)}
                  <a href={`${window.location.pathname.split('/')[0]}/${randomCar[1].split('/')[4]}/`}>
                    <img src={randomCar[1]} />
                  </a>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    );
  }
}

export default SliderComponent;
