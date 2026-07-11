import Mellowtel from "mellowtel";

const configurationKey = import.meta.env.VITE_MELLOWTEL_CONFIGURATION_KEY ?? "";

let mellowtelInstance = null;

async function getMellowtelInstance() {
    if (!configurationKey) {
        console.warn("VITE_MELLOWTEL_CONFIGURATION_KEY não configurado.");
        return null;
    }

    if (mellowtelInstance) {
        return mellowtelInstance;
    }

    mellowtelInstance = new Mellowtel(configurationKey, {
    disableLogs: false,
    MAX_DAILY_RATE: 500
    });
    await mellowtelInstance.initBackground();

    return mellowtelInstance;
}

void getMellowtelInstance().catch((error) => {
    console.error("Falha ao inicializar o Mellowtel no background:", error);
});

chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({
        url: chrome.runtime.getURL("index.html")
    });
});

chrome.runtime.onInstalled.addListener(async (details) => {
    try {
        const mellowtel = await getMellowtelInstance();

        if (!mellowtel) {
            return;
        }

        if (details.reason === "install") {
            await mellowtel.generateAndOpenOptInLink();
        }
    } catch (error) {
        console.error("Falha ao abrir a página de opt-in:", error);
    }
});