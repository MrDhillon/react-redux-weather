import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
  renderWeather(cityData){

    const name = cityData.city.name;
    let temps = cityData.list.map((weather) => weather.main.temp);
    const converted = temps.map(temp => {
      return _.round(temp = temp - 273);
    });
    const pressures = cityData.list.map((weather) => weather.main.pressure);
    const humidities = cityData.list.map((weather) => weather.main.humidity);
    const {lon, lat} = cityData.city.coord;
    // destructing above

    return (
      <tr key={cityData.city.id}>
        <td><GoogleMap lon={lon} lat={lat} /></td>
        <td><Chart data={converted} color="blue" units="C" /></td>
        <td><Chart data={pressures} color="green" units="hPa" /></td>
        <td><Chart data={humidities} color="orange" units="%"/></td>
      </tr>
    );
  }

  render(){
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (C)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state){
  return {weather: state.weather}
}

export default connect(mapStateToProps)(WeatherList);
