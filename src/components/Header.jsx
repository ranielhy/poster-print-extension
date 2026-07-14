import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function Header({ onOpenMellowtelSettings }) {
	return (
		<Stack
			className="top-banner"
			direction="row"
			spacing={2}
			sx={{
				alignItems: "center",
				justifyContent: "space-between",
				py: 1.2,
				px: 2,
				background: "linear-gradient(135deg, rgba(25, 103, 210, 0.08) 0%, rgba(63, 81, 181, 0.05) 100%)",
				borderRadius: "12px",
				backdropFilter: "blur(8px)",
				border: "1px solid rgba(25, 103, 210, 0.1)",
			}}
		>
			<Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flex: 1 }}>
				<Chip
					icon={<LocalPrintshopRoundedIcon />}
					label="Poster Print"
					color="primary"
					variant="filled"
					sx={{
						fontWeight: 700,
						borderRadius: "999px",
						height: 32,
						fontSize: "0.85rem",
					}}
				/>

				<Stack spacing={0.3}>
					<Typography
						variant="h6"
						component="h1"
						sx={{
							fontWeight: 800,
							fontSize: "1rem",
							lineHeight: 1.2,
							letterSpacing: "-0.02em",
							background: "linear-gradient(135deg, #1967d2 0%, #3f51b5 100%)",
							backgroundClip: "text",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						Transforme imagens em pôster gigante
					</Typography>

					<Typography
						sx={{
							fontSize: "0.8rem",
							color: "text.secondary",
							lineHeight: 1.3,
						}}
					>
						Divida imagens em páginas A4, gere PDF e imprima com facilidade
					</Typography>
				</Stack>
			</Stack>

			<Button
				variant="contained"
				size="small"
				startIcon={<AutoAwesomeRoundedIcon />}
				onClick={onOpenMellowtelSettings}
				sx={{
					borderRadius: "8px",
					textTransform: "none",
					fontWeight: 600,
					px: 2,
					py: 0.8,
					fontSize: "0.85rem",
					whiteSpace: "nowrap",
					boxShadow: "0 4px 12px rgba(0,0,0,.12)",
					"&:hover": {
						boxShadow: "0 6px 16px rgba(0,0,0,.16)",
					},
				}}
			>
				Configurar suporte Mellowtel
			</Button>
		</Stack>
	);
}

export default Header;