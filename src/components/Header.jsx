import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function Header({ onOpenMellowtelSettings }) {
	return (
		<Stack className="top-banner" spacing={2}>
			<Chip label="Poster Print" className="brand-chip" />

			<div>
				<Typography variant="h3" component="h1" className="brand-title">
					Quebre uma imagem em folhas de impressão
					<br />
					<span className="text-gradient">sem perder o controle.</span>
				</Typography>

				<Typography className="brand-subtitle">
					Ideal para pôsteres, painéis e composições grandes no popup da extensão.
				</Typography>
			</div>

			<Button variant="outlined" className="support-button" onClick={onOpenMellowtelSettings}>
				♡ Ajustar suporte Mellowtel
			</Button>
		</Stack>
	);
}

export default Header;
