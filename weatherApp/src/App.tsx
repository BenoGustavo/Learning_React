import React from 'react'
import { RegionSelect } from './components/RegionSelectForm/RegionSelect'
import { WeatherInfo } from './components/WetherInfo/WetherInfo'
import { Footer } from './components/Footer/Footer'
import './style.css'

type AppState = {
  region: string;
  city: string;
};

export class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      region: "AC",
      city: "Rio Branco"
    };
  }

  handleRegionChange = (region: string) => {
    this.setState({ region });
  };

  handleCityChange = (city: string) => {
    this.setState({ city });
  };


  render() {
    return (
      <>
        <main className='mainContainer'>
          <RegionSelect
            region={this.state.region}
            onRegionChange={this.handleRegionChange}
            onCityChange={this.handleCityChange}
          />
          <WeatherInfo region={this.state.region} city={this.state.city} />
        </main>
        <Footer />
      </>
    )
  }
}
