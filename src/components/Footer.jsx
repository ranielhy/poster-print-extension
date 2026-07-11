import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Footer({ hasPoster, isBusy, onDownloadPdf, onPrint, onOpenMellowtelSettings, onClearImage }) {
	return (
		    <Paper className="footer-surface" variant="outlined">
			    <div className="surface-number">4</div>
			    <div className="surface-inner">
			    <Stack spacing={2}>
				<div className="section-head">
					<div>
						<Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: "#0f1724" }}>
							Saída
						</Typography>
						<Typography className="section-copy">
							Exporte em PDF para compartilhar ou imprima diretamente no navegador.
						</Typography>
					</div>
				</div>

				{!hasPoster ? (
					<Paper className="footer-empty-state" variant="outlined">
						<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
							<span style={{ fontSize: "20px" }}>📋</span>
							<div>
								<Typography variant="subtitle2">Nenhuma imagem selecionada</Typography>
								<Typography className="section-copy">
									Carregue uma imagem para começar
								</Typography>
							</div>
						</Box>
					</Paper>
				) : (
					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
						<Typography sx={{ fontSize: 14, color: "#6b7280" }}>
							✓ Imagem selecionada - pronta para exportar
						</Typography>
						<Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ width: { xs: "100%", sm: "auto" } }}>
							<Button variant="outlined" color="error" onClick={onClearImage} sx={{ minWidth: 120 }}>
								✕ Limpar
							</Button>
							<Button variant="contained" disabled={isBusy} onClick={onDownloadPdf} sx={{ minWidth: 140 }}>
								📥 Gerar PDF
							</Button>
						</Stack>
					</Box>
				)}
			</Stack>
			</div>
		</Paper>
	);
}

export default Footer;
