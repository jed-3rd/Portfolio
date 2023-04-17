import React from 'react';

import "./skillGroup.scss";

import { Grid } from '@mui/material'

import SkillChip from '../skillChip/skillChip';

interface SkillGroupProps {
    title: string;
    list: string[];
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    onHandle: (skill: string) => boolean;
}

function SkillGroup(props: SkillGroupProps) {
    return (
        <>
            <h6 className='SectionSubTitle'>{props.title}</h6>
            <Grid container spacing={1} className="ChipContainer">
                {props.list.map(item => {
                  return <SkillChip key={item} label={item} onClick={props.onClick} onHandle={props.onHandle} />
                })}
            </Grid>
        </>
    )
}

export default SkillGroup;