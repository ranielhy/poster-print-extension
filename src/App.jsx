import { useEffect, useRef, useState } from "react";

import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { jsPDF } from "jspdf";
import Box from "@mui/material/Box";

import Footer from "./components/Footer";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";
import PreviewCanvas from "./components/PreviewCanvas";
import SettingsPanel from "./components/SettingsPanel";
import Home from "./pages/Home";
import { buildPosterPages, formatDimensions } from "./lib/poster";

const configurationKey = import.meta.env.VITE_MELLOWTEL_CONFIGURATION_KEY ?? "";

function hasExtensionStorage() {
    return typeof chrome !== "undefined" && Boolean(chrome.storage?.local) && Boolean(chrome.runtime?.id);
}

async function createPdfFile(tiles, pageWidth, pageHeight, fileName) {
    const pdf = new jsPDF({
        unit: "px",
        format: [pageWidth, pageHeight],
        orientation: pageWidth >= pageHeight ? "landscape" : "portrait",
        compress: true
    });

    tiles.forEach((tile, index) => {
        if (index > 0) {
            pdf.addPage([pageWidth, pageHeight], pageWidth >= pageHeight ? "landscape" : "portrait");
        }

        pdf.addImage(tile.dataUrl, "PNG", 0, 0, pageWidth, pageHeight);
    });

    pdf.save(fileName);
}

function openPrintWindow(tiles, pageWidth, pageHeight) {
    const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1024,height=768");

    if (!printWindow) {
        throw new Error("O navegador bloqueou a janela de impressão.");
    }

    const pageMarkup = tiles
        .map(
            (tile) => `
                <section class="print-page">
                    <img src="${tile.dataUrl}" alt="Página ${tile.index}" />
                </section>
            `
        )
        .join("");

    printWindow.document.open();
    printWindow.document.write(`
        <!doctype html>
        <html lang="pt-BR">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Impressão do pôster</title>
            <style>
              @page {
                size: ${pageWidth}px ${pageHeight}px;
                margin: 0;
              }

              html, body {
                margin: 0;
                padding: 0;
                background: #111827;
              }

              body {
                display: flex;
                flex-direction: column;
              }

              .print-page {
                width: ${pageWidth}px;
                height: ${pageHeight}px;
                page-break-after: always;
                break-after: page;
                background: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .print-page img {
                display: block;
                width: 100%;
                height: 100%;
              }
            </style>
          </head>
          <body>
            ${pageMarkup}
                        <script>
              window.onload = () => {
                window.focus();
                window.print();
              };
              window.onafterprint = () => window.close();
                        </script>
          </body>
        </html>
    `);
    printWindow.document.close();
}

function App() {
    const [imageSource, setImageSource] = useState("");
    const [imageName, setImageName] = useState("");
    const [imageSize, setImageSize] = useState(null);
    const [columns, setColumns] = useState(2);
    const [rows, setRows] = useState(2);
    const [pageSize, setPageSize] = useState("A4");
    const [pageMargin, setPageMargin] = useState(8);
    const [poster, setPoster] = useState(null);
    const [isBuilding, setIsBuilding] = useState(false);
    const [isPrinting, setIsPrinting] = useState(false);
    const [feedback, setFeedback] = useState("");
    const objectUrlRef = useRef("");

    useEffect(() => {
        let active = true;

        async function runBuild() {
            if (!imageSource) {
                setPoster(null);
                return;
            }

            setIsBuilding(true);

            try {
                const posterData = await buildPosterPages(imageSource, columns, rows, pageMargin);

                if (active) {
                    setPoster(posterData);
                }
            } catch (error) {
                if (active) {
                    setFeedback(error instanceof Error ? error.message : "Falha ao dividir a imagem.");
                    setPoster(null);
                }
            } finally {
                if (active) {
                    setIsBuilding(false);
                }
            }
        }

        runBuild();

        return () => {
            active = false;
        };
    }, [imageSource, columns, rows, pageMargin]);

    useEffect(() => {
        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
        };
    }, []);

    function handleClearImage() {
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = "";
        }

        setImageSource("");
        setImageName("");
        setImageSize(null);
        setPoster(null);
        setFeedback("");
    }

    async function handleImageSelected(file) {
        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            setFeedback("Escolha um arquivo de imagem válido.");
            return;
        }

        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
        }

        const nextObjectUrl = URL.createObjectURL(file);
        objectUrlRef.current = nextObjectUrl;
        setImageSource(nextObjectUrl);
        setImageName(file.name);
        setFeedback("");

        const loadedImage = await new Promise((resolve, reject) => {
            const image = new Image();

            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error("Não foi possível ler a imagem selecionada."));
            image.src = nextObjectUrl;
        });

        setImageSize({
            width: loadedImage.naturalWidth,
            height: loadedImage.naturalHeight
        });
    }

    async function handleDownloadPdf() {
        if (!poster || !imageName) {
            return;
        }

        setIsPrinting(true);

        try {
            await createPdfFile(
                poster.tiles,
                poster.pageWidth,
                poster.pageHeight,
                `${imageName.replace(/\.[^.]+$/, "") || "poster"}.pdf`
            );
        } finally {
            setIsPrinting(false);
        }
    }

    async function handlePrint() {
        if (!poster) {
            return;
        }

        setIsPrinting(true);

        try {
            openPrintWindow(poster.tiles, poster.pageWidth, poster.pageHeight);
        } finally {
            setTimeout(() => {
                setIsPrinting(false);
            }, 400);
        }
    }

    async function handleOpenMellowtelSettings() {
        if (!configurationKey) {
            setFeedback("Adicione VITE_MELLOWTEL_CONFIGURATION_KEY para ativar o Mellowtel.");
            return;
        }

        if (!hasExtensionStorage()) {
            setFeedback("Mellowtel só funciona dentro da extensão instalada.");
            return;
        }

        try {
            const { default: Mellowtel } = await import("mellowtel");
            const mellowtel = new Mellowtel(configurationKey);
            const settingsLink = await mellowtel.generateSettingsLink();
            window.open(settingsLink, "_blank", "noopener,noreferrer");
        } catch (error) {
            setFeedback(error instanceof Error ? error.message : "Não foi possível abrir o Mellowtel.");
        }
    }

    const pageCount = poster?.tiles.length ?? 0;

    const hasImage = Boolean(imageSource);

    return (
        <Container className="app-shell" maxWidth="xl" sx={{ py: { xs: 1.25, md: 2 }, px: { xs: 1, sm: 1.5 }, width: "100%" }}>
            <Stack spacing={2.25}>
                <Home />

                <Header onOpenMellowtelSettings={handleOpenMellowtelSettings} />

                <Divider sx={{ my: 1.25 }} />

                <Box id="workflow" className="dashboard-grid">
                    <Stack spacing={2.25} className="dashboard-column">
                        <Paper className="hero-surface hero-surface--intro" elevation={0}>
                            <Typography variant="overline" className="eyebrow">
                                Fluxo de impressão
                            </Typography>

                            <Typography variant="h4" component="h2" className="surface-title">
                                Um fluxo simples para criar pôster gigante sem layout confuso.
                            </Typography>

                            <Typography className="surface-copy">
                                Envie a imagem, ajuste a grade e gere a saída em PDF ou impressão direta com uma prévia clara do que vai sair no papel.
                            </Typography>
                        </Paper>

                        <ImageUploader
                            imageName={imageName}
                            imageSource={imageSource}
                            onImageSelected={handleImageSelected}
                            onClearImage={handleClearImage}
                        />

                        <SettingsPanel
                            columns={columns}
                            rows={rows}
                            onColumnsChange={setColumns}
                            onRowsChange={setRows}
                            pageCount={pageCount}
                            imageSize={imageSize ? formatDimensions(imageSize.width, imageSize.height) : "Nenhuma imagem selecionada"}
                            pageSize={pageSize}
                            onPageSizeChange={setPageSize}
                            pageMargin={pageMargin}
                            onPageMarginChange={setPageMargin}
                        />
                    </Stack>

                    <Stack spacing={2.25} className="dashboard-column dashboard-column--results" id="resultado">
                        {hasImage ? (
                            <>
                                {feedback ? <Alert severity="info">{feedback}</Alert> : null}

                                <PreviewCanvas
                                    tiles={poster?.tiles ?? []}
                                    isLoading={isBuilding}
                                    pageWidth={poster?.pageWidth ?? 0}
                                    pageHeight={poster?.pageHeight ?? 0}
                                />

                                <Footer
                                    isBusy={isPrinting || isBuilding}
                                    hasPoster={Boolean(poster)}
                                    onDownloadPdf={handleDownloadPdf}
                                    onPrint={handlePrint}
                                    onOpenMellowtelSettings={handleOpenMellowtelSettings}
                                    onClearImage={handleClearImage}
                                />
                            </>
                        ) : (
                            <Paper className="hero-surface hero-surface--results" elevation={0}>
                                <Typography variant="overline" className="eyebrow">
                                    Resultado
                                </Typography>
                                <Typography variant="h4" component="h2" className="surface-title">
                                    A prévia e a exportação aparecem aqui depois que você enviar a imagem.
                                </Typography>
                                <Typography className="surface-copy">
                                    Quando uma imagem for carregada, esta área passa a mostrar a grade do pôster, a pré-visualização das folhas e os botões de PDF e impressão.
                                </Typography>
                            </Paper>
                        )}
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
}

export default App;