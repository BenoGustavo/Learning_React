import React from "react";
import braziliamStates from "../../assets/json/states.json"
import "./style.css"
import { saveOnLocalStorage, loadLocalStorage } from "../../utils/localStorageController"

type RegionSelectProps = {
    region: string;
    onRegionChange: (region: string) => void;
    onCityChange: (city: string) => void;
};

export class RegionSelect extends React.Component<RegionSelectProps> {
    regionJson: { [key: string]: string[] };

    constructor(props: RegionSelectProps) {
        super(props);
        this.regionJson = braziliamStates;

        const regionLocalStorage = loadLocalStorage('region')
        const cityLocalStorage = loadLocalStorage('city')

        if (regionLocalStorage && cityLocalStorage) {
            this.props.onRegionChange(regionLocalStorage);
            this.props.onCityChange(cityLocalStorage);
        }
    }

    handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const region = event.target.value;
        this.props.onRegionChange(region);
        this.props.onCityChange(this.regionJson[region][0]);

        saveOnLocalStorage('region', region);
        saveOnLocalStorage('city', this.regionJson[region][0]);
    };

    handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onCityChange(event.target.value);

        saveOnLocalStorage('city', event.target.value);
    };

    render() {
        return (
            <section className="FormContainer">
                <form>
                    <div className="state">
                        <label htmlFor="region">Estados:</label>
                        <select id="region" name="region" value={this.props.region} onChange={this.handleRegionChange}>
                            {Object.keys(this.regionJson).map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="city">
                        <label htmlFor="citie">Cidades:</label>
                        <select id="citie" name="citie" onChange={this.handleCityChange}>
                            {this.regionJson[this.props.region].map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            </section>
        );
    }
}