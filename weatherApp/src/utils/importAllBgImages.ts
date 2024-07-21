function getBackgroundImages(): { [key: string]: string } {
    const images = import.meta.glob("../assets/img/bg/*.{png,jpg,jpeg,svg}", { eager: true });

    const importedImages: { [key: string]: string } = {};

    for (const path in images) {
        importedImages[path.replace('./assets/img/bg/', '')] = (images as any)[path].default;
    }
    return importedImages;
}

export function getBackgroundBasedOnCode(iconCode: string): string {
    const backgroundImages = getBackgroundImages();
    switch (iconCode) {
        case '01d':
            return backgroundImages['.clear_sky_day.png'];
        case '01n':
            return backgroundImages['.clear_sky_night.png'];
        case '02d':
            return backgroundImages['.few_clouds_day.png'];
        case '02n':
            return backgroundImages['.few_clouds_night.png'];
        case '03d':
            return backgroundImages['.cloudy_day.png'];
        case '04d':
            return backgroundImages['.cloudy_day.png'];
        case '03n':
            return backgroundImages['.cloudy_night.png'];
        case '04n':
            return backgroundImages['.cloudy_night.png'];
        case '09d':
            return backgroundImages['.light_rain_day.png'];
        case '10d':
            return backgroundImages['.light_rain_day.png'];
        case '09n':
            return backgroundImages['.light_rain_night.png'];
        case '10n':
            return backgroundImages['.light_rain_night.png'];
        case '11d':
            return backgroundImages['.thunderstorm.png'];
        case '11n':
            return backgroundImages['.thunderstorm.png'];
        case '13d':
            return backgroundImages['.snowing_day.png'];
        case '13n':
            return backgroundImages['.snowing_night.png'];
        case '50d':
            return backgroundImages['.mist_daytime.png'];
        case '50n':
            return backgroundImages['.mist_nighttime.png'];
        default:
            return "";
    }
}