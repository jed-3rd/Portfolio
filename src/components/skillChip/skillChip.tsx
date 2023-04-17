import React from "react";

import { Chip, Grid } from '@mui/material';

interface SkillChipProps {
    label: string;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    onHandle: (skill: string) => boolean;
}

function SkillChip(props: SkillChipProps) {
    
    const id = props.label.replace(/\s/g, "")

    return (
        <Grid item>
            <Chip id={id} label={props.label} variant={props.onHandle(id) ? "filled" : "outlined"} clickable color="primary" onClick={props.onClick} />
        </Grid>
    )
}

export default SkillChip;