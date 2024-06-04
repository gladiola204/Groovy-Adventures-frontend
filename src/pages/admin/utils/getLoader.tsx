import { Loader } from "@googlemaps/js-api-loader";

let loaderInstance: Loader | null = null;

const getLoader = () => {
    if (!loaderInstance) {
        loaderInstance = new Loader({
            apiKey: "AIzaSyBnjyHr_ZVcQWV_-Xxob---xLdcHED5pQs",
            version: "weekly",
        });
    };
    
    return loaderInstance;
};

export default getLoader;