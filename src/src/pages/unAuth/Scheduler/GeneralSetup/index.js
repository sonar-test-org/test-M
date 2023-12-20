import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import { Loader } from "../../../../components/Loader";
import { AlertSnackbar } from "../../../../components/Snackbars/AlertSnackbar";
import { ALERT_TIMEOUT, ERROR, GLOBAL_ERROR, SUCCESS } from "../../../../utils/variables";
import { CustomTable } from "./CustomTable";
import { getAllSetupReports, getSetupReport } from "../../../../services/api";
import { generateErrorMessage } from "../../../../utils/commonUtils";
import { Heading } from "./Heading";

export const GeneralSetup = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		open: false,
		message: "",
		flag: "",
	});
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		getAllSetupReportsLocal();
	}, []);

	const getAllSetupReportsLocal = async () => {
		setLoading(true);
		try {
			const res = await getAllSetupReports();
			if (res.data.data) {
				setTableData(
					res.data.data?.map((item) => ({
						...item,
						isParameterized: item.isParameterized === "Y" ? "Yes" : "No",
					}))
				);
				console.log("res.data.data", res.data.data);
				setLoading(false);
				if (!res.data.data.length) {
					alertHandler(true, "Successfully fetched setup reports", SUCCESS);
				}
			} else {
				const errorMessage = res.data?.status?.description || GLOBAL_ERROR;
				throw new Error(errorMessage);
			}
		} catch (error) {
			const errorMessage = generateErrorMessage(error);
			alertHandler(true, errorMessage, ERROR);
			setLoading(false);
		}
	};

	const alertHandler = (type, message, flag) => {
		setAlert({
			open: type,
			message,
			flag,
		});

		setTimeout(() => {
			setAlert({
				open: false,
				message: "",
				flag: "",
			});
		}, ALERT_TIMEOUT);
	};

	const onCreateNewSetup = () => {
		navigate("/scheduler/create-new-setup", { state: { schedulerId: null } });
	};

	const onClickRowEdit = (id) => {
		navigate("/scheduler/create-new-setup", { state: { schedulerId: id } });
	};

	return (
		<Box container sx={styles.maincontainer}>
			<Loader loading={loading}>
				<AlertSnackbar open={alert.open} flag={alert.flag} message={alert.message} />
				<Heading onCreateNewSetup={onCreateNewSetup} />
				<CustomTable tableData={tableData} onClickRowEdit={onClickRowEdit} />
			</Loader>
		</Box>
	);
};

const styles = {
	maincontainer: {
		padding: "0px 100px 100px 100px",
		minHeight: "100vh",
	},
	headerIcon: { width: "20px" },
};
