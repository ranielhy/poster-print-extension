import { useRef, useState } from "react";

import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function ImageUploader({ imageName, imageSource, onImageSelected, onClearImage }) {
	const inputRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);

	function openPicker() {
		inputRef.current?.click();
	}

	async function handleFile(file) {
		await onImageSelected(file);
	}

	function handleChange(event) {
		void handleFile(event.target.files?.[0]);
		event.target.value = "";
	}

	function handleDrop(event) {
		event.preventDefault();
		setIsDragging(false);
		void handleFile(event.dataTransfer.files?.[0]);
	}

	return (
		<Paper
			className={`upload-surface ${isDragging ? "upload-surface--active" : ""}`}
			variant="outlined"
			onClick={openPicker}
			onDragEnter={(event) => {
				event.preventDefault();
				setIsDragging(true);
			}}
			onDragOver={(event) => {
				event.preventDefault();
				setIsDragging(true);
			}}
			onDragLeave={() => setIsDragging(false)}
			onDrop={handleDrop}
		>
			<input ref={inputRef} accept="image/*" type="file" hidden onChange={handleChange} />

			<div className="surface-number">1</div>
			<div className="surface-inner">
				<Stack spacing={2} className="upload-content">
					{!imageSource ? (
						<>
							<Box className="upload-icon">
								<AddPhotoAlternateOutlinedIcon sx={{ fontSize: 32 }} />
							</Box>

							<div>
								<Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: "#0f1724" }}>
									Solte uma imagem aqui ou selecione um arquivo
								</Typography>

								<Typography className="upload-copy">
									A prévia e o PDF são gerados a partir do arquivo original, sem dependência de servidor.
								</Typography>
							</div>

							<Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ xs: "stretch", sm: "center" }}>
								<Button
									variant="contained"
									onClick={(event) => {
										event.stopPropagation();
										openPicker();
									}}
								>
									Selecionar imagem
								</Button>
							</Stack>

							<Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
								Formatos suportados: JPG, PNG, WEBP • Máx. 20MB
							</Typography>
						</>
					) : (
						<Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
							<Box
								component="div"
								sx={{
									width: "120px",
									height: "120px",
									borderRadius: "12px",
									overflow: "hidden",
									border: "2px solid #E5E7EB"
								}}
							>
								<img src={imageSource} alt="Prévia da imagem selecionada" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
							</Box>

							<Stack spacing={0.5} sx={{ textAlign: "center", width: "100%" }}>
								<Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#0f1724" }}>
									Arquivo carregado
								</Typography>
								<Typography className="selected-file-name">{imageName}</Typography>
							</Stack>

							<Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems="center" sx={{ width: "100%" }}>
								<Button
									variant="contained"
									fullWidth
									onClick={(event) => {
										event.stopPropagation();
										openPicker();
									}}
								>
									Trocar imagem
								</Button>

								<Button
									variant="text"
									color="inherit"
									startIcon={<DeleteOutlinedIcon />}
									fullWidth
									onClick={(event) => {
										event.stopPropagation();
										onClearImage();
									}}
									sx={{ 
										color: "#dc2626",
										border: "2px solid #dc2626",
										"&:hover": {
											backgroundColor: "#fee2e2",
											border: "2px solid #dc2626"
										}
									}}
								>
									Remover
								</Button>
							</Stack>
						</Stack>
					)}
				</Stack>
			</div>
		</Paper>
	);
}

export default ImageUploader;
