import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function SettingsPanel({ columns, rows, onColumnsChange, onRowsChange, pageCount, imageSize }) {
	return (
		<Paper className="settings-surface" variant="outlined">
			<Stack spacing={2}>
				<div className="section-head">
					<div>
						<Typography variant="h6" component="h2">
							Grade de divisão
						</Typography>
						<Typography className="section-copy">
							Defina quantas colunas e linhas a imagem deve ocupar no pôster final.
						</Typography>
					</div>

					<Chip label={`${pageCount || 0} páginas`} />
				</div>

				<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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

				<Typography className="settings-meta">Imagem: {imageSize}</Typography>
			</Stack>
		</Paper>
	);
}

export default SettingsPanel;
