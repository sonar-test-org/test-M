import { SubHeader } from "../../../../components/Headers/SubHeader";
import ErrorIcon from "@mui/icons-material/Error";
import {
	Box,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { ErrorDetailsModal } from "./ErrorDetailsModal";
import { useState } from "react";
import { reportHistoryHeadings } from "../../../../utils/schedulerUtils";

export const HistoryCustomTable = ({ tableData, loading }) => {
	const [exceptionLog, setExceptionLog] = useState({});
	const [showExceptionLog, setShowExceptionLog] = useState(false);
	const blurStyles = loading ? styles.blur : {};

	const onClick = (datt) => {
		setExceptionLog(datt || {});
		setShowExceptionLog(true);
	};

	const handleClose = () => {
		setExceptionLog({});
		setShowExceptionLog(false);
	};

	return (
		<Box sx={styles.mainCon}>
			<SubHeader text={`${"Run History"} ${loading ? "Loading..." : ""}`} headerLinks={[]} />
			<TableContainer sx={blurStyles}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							{reportHistoryHeadings.map((heading) => (
								<TableCell sx={styles.tableHead}>{heading}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData.map((row) => {
							return (
								<TableRow key={row.id} sx={styles.tableRow}>
									<TableCell>
										{row.status === "Error" ? (
											<Button onClick={() => onClick(row.schedulerExceptionLog)}>
												<ErrorIcon sx={{ color: "#c10303" }} />
											</Button>
										) : null}
									</TableCell>
									<TableCell>{row.id}</TableCell>
									<TableCell>{row.serviceType}</TableCell>
									<TableCell>{row.runType}</TableCell>
									<TableCell>{row.status}</TableCell>
									<TableCell>{row.recordProcessed}</TableCell>
									<TableCell>{row.startTime}</TableCell>
									<TableCell>{row.endTime}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<ErrorDetailsModal open={showExceptionLog} handleClose={handleClose} data={exceptionLog} />
		</Box>
	);
};

const styles = {
	tableRow: {
		"&:last-child td, &:last-child th": { border: 0 },
		transition: "0.3s",
		":hover": {
			background: "#d8e9ff7a",
		},
	},
	tableHead: {
		fontWeight: 700,
		fontSize: "16px",
		lineHeight: "20px",
		color: "#30363C",
	},
	con: {
		marginTop: "60px",
	},

	loadongColors: {
		zIndex: "10000",
		background: "#216ba55e",
	},
	blur: {
		filter: "blur(4px)",
		"-webkit-filter": "blur(4px)",
	},
	loadingCon: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		zIndex: "-1",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	mainCon: {
		position: "relative",
	},
};
