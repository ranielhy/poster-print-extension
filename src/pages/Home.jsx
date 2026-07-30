import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const highlights = ["Pôster gigante", "PDF pronto", "Impressão A4"];

const benefits = [
	"Dividir imagem em várias páginas A4",
	"Criar pôster gigante em PDF",
	"Imprimir cartaz grande com recorte simples",
	"Transformar foto em poster para parede"
];

const stats = [
	{ value: "1", label: "envio de imagem" },
	{ value: "4", label: "etapas guiadas" },
	{ value: "PDF", label: "para imprimir" }
];

function Home({ onOpenMellowtelSupport }) {
	return (
		<Paper
			component="section"
			variant="outlined"
			sx={{
				p: { xs: 2, md: 3 },
				borderRadius: 4,
				background:
					"linear-gradient(135deg, rgba(14,165,161,0.10) 0%, rgba(255,255,255,0.95) 38%, rgba(251,146,60,0.06) 100%)",
				borderColor: "rgba(14,165,161,0.16)",
				boxShadow: "0 24px 70px rgba(15, 23, 36, 0.08)",
				overflow: "hidden",
				position: "relative"
			}}
		>
			<Stack spacing={2.25}>
				<Stack spacing={1.5} >
					<Chip
						label="Ferramenta para pôster, cartaz e impressão em A4"
						color="primary"
						variant="outlined"
						sx={{ width: "fit-content", fontWeight: 700, letterSpacing: 0.2, borderRadius: 999 }}
					/>

					<Typography
						variant="h2"
						component="h2"
						sx={{
							fontWeight: 800,
							fontSize: 30,
							lineHeight: 1.05,
							color: "#0f1724",
							letterSpacing: "-0.03em"
						}}
					>
						Transforme imagens em pôster gigante com layout limpo, PDF pronto e impressão simples.
					</Typography>

					<Typography
						sx={{
							color: "text.secondary",
							fontSize: { xs: "1rem", md: "1.05rem" },
							maxWidth: 850,
							lineHeight: 1.7
						}}
					>
						O Poster Print foi desenhado para quem quer imprimir imagem grande sem complicação: envie a foto, escolha a grade, veja a prévia e exporte o arquivo em PDF para recortar e colar.
					</Typography>
				</Stack>

				<Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
					{highlights.map((item) => (
						<Chip
							key={item}
							label={item}
							sx={{
								backgroundColor: "rgba(15,23,36,0.05)",
								color: "#0f1724",
								fontWeight: 700,
								borderRadius: 999
							}}
						/>
					))}
				</Stack>

				<Stack
					direction={{ xs: "column", md: "row" }}
					spacing={1.5}
					sx={{
						p: 1,
						borderRadius: 3,
						backgroundColor: "rgba(255,255,255,0.68)",
						border: "1px solid rgba(15,23,36,0.06)"
					}}
				>
					{stats.map((stat) => (
						<Paper
							key={stat.label}
							variant="outlined"
							sx={{
								flex: 1,
								p: 1.5,
								borderRadius: 2.5,
								borderColor: "rgba(15,23,36,0.08)",
								background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,252,0.95))"
							}}
						>
							<Typography sx={{ fontWeight: 800, fontSize: "1.4rem", color: "#0f1724" }}>
								{stat.value}
							</Typography>
							<Typography sx={{ color: "text.secondary", textTransform: "uppercase", fontSize: 12, letterSpacing: 0.08 }}>
								{stat.label}
							</Typography>
						</Paper>
					))}
				</Stack>

				<Stack spacing={1.2} sx={{ maxWidth: 860 }}>
					<Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0f1724" }}>
						O que você pode fazer
					</Typography>
					<Box
						component="ul"
						sx={{
							m: 0,
							pl: 2.5,
							display: "grid",
							gap: 1,
							color: "text.secondary",
							lineHeight: 1.65
						}}
					>
						{benefits.map((item) => (
							<li key={item}>{item}</li>
						))}
					</Box>
				</Stack>

				<Paper
					variant="outlined"
					sx={{
						p: { xs: 1.5, md: 2 },
						borderRadius: 3,
						borderColor: "rgba(14,165,161,0.22)",
						background: "linear-gradient(135deg, rgba(14,165,161,0.10) 0%, rgba(255,255,255,0.94) 55%, rgba(251,146,60,0.08) 100%)"
					}}
				>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}>
						<Stack spacing={0.5} sx={{ maxWidth: 680 }}>
							<Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0f1724" }}>
								Apoie o projeto com Mellowtel
							</Typography>
							<Typography sx={{ color: "text.secondary", lineHeight: 1.65 }}>
								Se você usa esta ferramenta com frequência, pode apoiar o desenvolvimento pela página de suporte da Mellowtel sem mudar seu fluxo de uso.
							</Typography>
						</Stack>

						<Button variant="contained" size="large" onClick={onOpenMellowtelSupport} sx={{ whiteSpace: "nowrap" }}>
							Abrir apoio Mellowtel
						</Button>
					</Stack>
				</Paper>

				<Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
					<Button variant="contained" size="large" href="#workflow">
						Começar agora
					</Button>
					<Button variant="outlined" size="large" href="#resultado">
						Ver resultado
					</Button>
				</Stack>
			</Stack>
		</Paper>
	);
}

export default Home;
