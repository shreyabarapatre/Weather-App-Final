import React, { Component } from 'react'

export default class DailyWeather extends Component {
    state={
        showWeatherDetails : false
    }


    render() {
        const { weather } = this.props;
        //console.log(weather,'weather')
        const { showWeatherDetails } = this.state;
        
        return (
            <div>
                <div className="card"  style={{width: "15rem", margin:'15px'}}>
                    <img className="card-img-top" alt="Weather Icon" src={ "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png" }/>
                    <div>
                        <button className="btn stretched-link" onClick={() =>
                            this.setState({
                                showWeatherDetails: !showWeatherDetails
                            })
                        }>
                            <i className="fas fa-info-circle fa-2x"/>
                        </button>
                        {
                            showWeatherDetails ? (
                                <div className="card-text" style={{padding:'5px'}}>
                                    Minimum Temperature: { weather.temp.min }&#176;C<br/>
                                    Maximum Temperature : { weather.temp.max } &#176;C<br/>
                                    Weather Parameter : { weather.weather[0].main } <br/>
                                    Description : { weather.weather[0].description }
                                </div>
                            )
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}
