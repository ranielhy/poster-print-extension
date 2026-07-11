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
				<Box className="upload-icon">
					<AddPhotoAlternateOutlinedIcon />
				</Box>

				<div>
					<Typography variant="h6" component="h2">
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

					{imageSource ? (
						<Button
							variant="text"
							color="inherit"
							startIcon={<DeleteOutlinedIcon />}
							onClick={(event) => {
								event.stopPropagation();
								onClearImage();
							}}
						>
							Remover
						</Button>
					) : null}
				</Stack>

				{imageSource ? (
					<Stack direction="row" spacing={1.5} alignItems="center" className="selected-file">
						<img src={imageSource} alt="Prévia da imagem selecionada" />
						<div>
							<Typography variant="subtitle2">Arquivo carregado</Typography>
							<Typography className="selected-file-name">{imageName}</Typography>
						</div>
					</Stack>
				) : null}
				</Stack>
			</div>
		</Paper>
	);
}

export default ImageUploader;
