import React from 'react';
import {Typography} from "@mui/material";
import {Config} from "../../../config/config.const.ts";

export function CannotShowData(){
	return <Typography color={'secondary'} sx={{p:2}}>
        Data cannot be shown when more than {Config.maxMechanismCountForPreview} mechanisms are selected. You can still approve these mechanisms.
	</Typography>
}