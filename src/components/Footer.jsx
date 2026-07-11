import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function Footer({ hasPoster, isBusy, onDownloadPdf, onPrint, onOpenMellowtelSettings }) {
	return (
		    <Paper className="footer-surface" variant="outlined">
			    <div className="surface-number">4</div>
			    <div className="surface-inner">
			    <Stack spacing={2}>
				<div className="section-head">
					<div>
						<Typography variant="h6" component="h2">
							Saída
						</Typography>
						<Typography className="section-copy">
							Exporte em PDF para compartilhar ou imprima diretamente no navegador.
						</Typography>
					</div>
				</div>

				<Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
					{/* <Button variant="outlined" onClick={onOpenMellowtelSettings}>
						Mellowtel
					</Button> */}
{/* 
					<Button variant="outlined" disabled={!hasPoster || isBusy} onClick={onPrint}>
						Imprimir
					</Button> */}

					<Button variant="contained" disabled={!hasPoster || isBusy} onClick={onDownloadPdf}>
						Gerar PDF
					</Button>
				</Stack>
			</Stack>
			</div>
		</Paper>
	);
}

export default Footer;
