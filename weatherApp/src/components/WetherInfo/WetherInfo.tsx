import React from "react";
import "./style.css";
import { getBackgroundBasedOnCode } from "../../utils/importAllBgImages";
import { loadLocalStorage } from "../../utils/localStorageController"

type WeatherInfoProps = {
    city: string;
    region: string;
};

type WeatherInfoState = {
    data: any,
    loading: boolean,
    error: any
    icon: any
};

export class WeatherInfo extends React.Component<WeatherInfoProps, WeatherInfoState> {
    apiKey: string;

    constructor(props: any) {
        super(props);
        this.state = {
            data: null,
            loading: true,
            error: null,
            icon: null,
        };

        this.apiKey = import.meta.env.VITE_API_KEY || '';
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.city !== prevProps.city) {
            this.fetchData();
        }
    }

    fetchData = async () => {
        const city = loadLocalStorage("city");

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&lang=pt_br&units=metric`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            this.setState({ icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`, data: data, loading: false });

            let bgUrl = getBackgroundBasedOnCode(data.weather[0].icon)

            document.body.style.backgroundImage = `url(${bgUrl})`;

        } catch (error) {
            this.setState({ error, loading: false });
        }
    };

    render() {
        const { data, loading, error } = this.state;
        const { region, city } = this.props;

        const today = new Date();

        const formattedDate = today.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        if (loading) {
            return (
                <section className="wetherInfoContainer">
                    <div className="wrapper">
                        <h1>Loading...</h1>;
                    </div>
                </section>);
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }


        return (
            <section className="wetherInfoContainer">
                <div className="wrapper">
                    <div className="date">
                        <span>{formattedDate}</span>
                    </div>
                    <div className="city">
                        <span>{city} - {region} - BR</span>
                    </div>
                    <div className="temperature">
                        <span>{Math.round(data.main.temp)}°</span>
                        <img src={this.state.icon} alt="" />
                    </div>
                    <div className="wetherInfo">
                        <div className="description">
                            <span>{data.weather[0].description}</span>
                        </div>
                        <div className="windAndHumidityContainer">
                            <div className="wind">
                                <span>Sensação: <strong>{Math.round(data.main.feels_like)}°</strong></span>
                            </div>
                            <div className="humidity">
                                <span>Umidade: <strong>{data.main.humidity}%</strong></span>
                            </div>
                        </div>
                        <div className="windAndHumidityContainer">
                            <div className="wind">
                                <span>Minima: <strong>{Math.round(data.main.temp_min)}°</strong></span>
                            </div>
                            <div className="humidity">
                                <span>Maxima: <strong>{Math.round(data.main.temp_max)}°</strong></span>
                            </div>
                        </div>
                        <div className="windAndHumidityContainer">
                            <div className="wind">
                                <span>Vento: {data.wind.speed}km/h</span>
                            </div>
                            <div className="humidity">
                                <span>Nivel do mar: {data.main.sea_level}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}