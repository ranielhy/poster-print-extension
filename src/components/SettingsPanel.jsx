import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function SettingsPanel({
	columns,
	rows,
	onColumnsChange,
	onRowsChange,
	pageCount,
	imageSize,
	pageSize = "A4",
	onPageSizeChange,
	pageMargin = 8,
	onPageMarginChange
}) {
	return (
		<Paper className="settings-surface" variant="outlined">
			<div className="surface-number">2</div>
			<div className="surface-inner">
				<Stack spacing={1.25}>
					<div className="section-head">
						<div>
							<Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: "#0f1724", fontSize: 18 }}>
								Grade de divisão
							</Typography>
							<Typography className="section-copy" sx={{ fontSize: 13 }}>
								Defina quantas colunas e linhas a imagem deve ocupar no pôster final.
							</Typography>
						</div>

						<Chip label={`${pageCount || 0} páginas`} />
					</div>

					<Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
						<TextField
							label="Colunas"
							type="number"
							value={columns}
							onChange={(event) => onColumnsChange(Number(event.target.value) || 1)}
							inputProps={{ min: 1, max: 12 }}
							fullWidth
						/>

						<TextField
							label="Linhas"
							type="number"
							value={rows}
							onChange={(event) => onRowsChange(Number(event.target.value) || 1)}
							inputProps={{ min: 1, max: 12 }}
							fullWidth
						/>
					</Stack>

					<FormControl fullWidth size="small">
						<InputLabel>Tamanho de página</InputLabel>
						<Select
							value={pageSize}
							label="Tamanho de página"
							onChange={(event) => onPageSizeChange(event.target.value)}
						>
							<MenuItem value="A4">A4 (210 × 297mm)</MenuItem>
							<MenuItem value="A3">A3 (297 × 420mm)</MenuItem>
							<MenuItem value="Letter">Letter (8.5 × 11")</MenuItem>
							<MenuItem value="Legal">Legal (8.5 × 14")</MenuItem>
						</Select>
					</FormControl>

					<Stack spacing={1}>
						<Typography sx={{ fontSize: 13, fontWeight: 600, color: "#0f1724" }}>
							Margem da página: {pageMargin}px
						</Typography>
						<Slider
							value={pageMargin}
							onChange={(event, newValue) => onPageMarginChange(newValue)}
							min={0}
							max={40}
							step={2}
							marks={[
								{ value: 0, label: "0" },
								{ value: 20, label: "20" },
								{ value: 40, label: "40" }
							]}
							sx={{
								"& .MuiSlider-thumb": { backgroundColor: "#0d9488" },
								"& .MuiSlider-track": { backgroundColor: "#0d9488" }
							}}
						/>
					</Stack>

					<Typography className="settings-meta" sx={{ mt: 0.5 }}>
						Imagem: {imageSize}
					</Typography>
				</Stack>
			</div>
		</Paper>
	);
}

export default SettingsPanel;
