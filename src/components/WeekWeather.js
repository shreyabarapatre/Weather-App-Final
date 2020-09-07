import React, { Component } from 'react'
import DailyWeather from './DailyWeather';

export default class WeekWeather extends Component {
    constructor(props){
        super(props)
        this.state = {
            dailyData:[],
            days:7,
            city:'London',
            lat:'',
            lon:''
        }
    
    }
    
    componentDidMount = () => {
        const api = 'https://api.openweathermap.org/data/2.5/onecall?lat=51.50015&lon=-0.12624&exclude=hourly,minutely&units=metric&appid=34cd15a9fbb6ae590e0169ffafd25206'
        fetch(api)
        .then(result => result.json())
        .then( data => {
            const dataDay = data.daily
            this.setState({
                dailyData:dataDay
            })
        })
    }

    search = async () =>{
        const apiCity =`https://api.tomtom.com/search/2/geocode/${this.state.city}.json?limit=1&key=HBtyC5BbjoGMQNXjSzPM7jnrLCYCv0BS`
        await fetch(apiCity)
        .then(result => result.json())
        .then(data => {
            this.setState({
                lat:data.results[0].position.lat,
                lon:data.results[0].position.lon
            })
        })
        console.log(this.state.lat,this.state.lon,'-alatlon')
        const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=hourly,minutely&units=metric&appid=34cd15a9fbb6ae590e0169ffafd25206`
        fetch(api)
        .then(result => result.json())
        .then( data => {
            const dataDay = data.daily
            this.setState({
                dailyData:dataDay
            })
        })
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const { dailyData, days, city } = this.state;
        return (
            <div  className="container">
                <h1 className="display-1 jumbotron"> 5-Day Forecast </h1>
                <h5 className="display-5 text-muted">{city}</h5>
                    <br/><br/><br/>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-3"/>
                            <label htmlFor="days" className="col-md-3">Enter City</label>
                            <input
                                type="text"
                                name="city"
                                className='form-control col-md-3'
                                placeholder="eg. Mumbai"
                                defaultValue={city}
                                onChange={this.onChange}                               
                            />
                            <button
                                className="btn btn-primary"
                                onClick={this.search}
                            >
                                Search
                            </button>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-3"/>
                            <label htmlFor="days" className="col-md-3">Enter Number Of Days</label>
                            <input
                                type="text"
                                name="days"
                                className='form-control col-md-3'
                                placeholder="Enter Days"
                                defaultValue={days}
                                onChange={this.onChange}                               
                            />
                        </div>
                    </div>     
                    <div className="row">
                        {
                            dailyData.slice(0,parseInt(days)).map(daily => (
                               <DailyWeather weather ={daily}  />
                            ))
                        }
                    </div>
                </div>
            )
    }
}
