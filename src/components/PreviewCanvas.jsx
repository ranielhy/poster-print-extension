import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function PreviewCanvas({ tiles, isLoading, pageWidth, pageHeight }) {
	return (
		    <Paper className="preview-surface" variant="outlined">
			    <div className="surface-number">3</div>
			    <div className="surface-inner">
			    <Stack spacing={2}>
				<div className="section-head">
					<div>
						<Typography variant="h6" component="h2">
							Todas as páginas
						</Typography>
						<Typography className="section-copy">
							Cada cartão abaixo representa uma folha do PDF e da impressão.
						</Typography>
					</div>

					<Typography className="settings-meta">
						{pageWidth && pageHeight ? `${pageWidth} × ${pageHeight}px` : "Aguardando imagem"}
					</Typography>
				</div>

				{isLoading ? <Typography className="empty-state">Gerando páginas...</Typography> : null}

				{!isLoading && tiles.length === 0 ? (
					<Typography className="empty-state">Carregue uma imagem para ver a grade completa.</Typography>
				) : null}

				{tiles.length > 0 ? (
					<div className="preview-grid">
						{tiles.map((tile) => (
							<article
								key={tile.index}
								className="preview-card"
								style={{ aspectRatio: `${pageWidth} / ${pageHeight}` }}
							>
								<img src={tile.dataUrl} alt={`Página ${tile.index}`} />
								<span className="preview-card-badge">{tile.index}</span>
							</article>
						))}
					</div>
				) : null}
			</Stack>
			</div>
		</Paper>
	);
}

export default PreviewCanvas;
