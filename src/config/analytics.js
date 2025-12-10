import ReactGA from "react-ga4";

// Inicialize com seu ID de Medição do Google Analytics 4
// Você pode encontrar isso em Admin > Fluxos de Dados > Web
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: Substitua pelo seu ID real

export const initGA = () => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const logPageView = () => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logEvent = (category, action, label) => {
    ReactGA.event({
        category: category,
        action: action,
        label: label,
    });
};
