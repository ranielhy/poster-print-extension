import Mellowtel from "mellowtel";

const configurationKey =
    import.meta.env.VITE_MELLOWTEL_CONFIGURATION_KEY;

(async () => {
    if (!configurationKey) return;

    const mellowtel = new Mellowtel(configurationKey, {
        disableLogs: false,
        MAX_DAILY_RATE: 500
    });

    await mellowtel.initContentScript();
})();