import React, { useEffect, useState } from 'react';

import {
    FormControl,
    Container,
    Button,
    TextField,
    Typography,
} from '@mui/material';

import { useSubmit } from '../../components/hooks';
import { Padding } from '../../components/layout/padding';
import { SketchEntry } from '../../components/sketch/sketch-entry';
import { useAppDispatch, useAppSelector } from '../../middlewares/hooks';
import { ENTITY_SLICE_NAME } from '../../middlewares/node-entity/constants';
import {
    createEntity,
    getAllEntities,
} from '../../middlewares/node-entity/thunks';
import { logger } from '../../utils';
import { Navigations } from '../templates';

export function AllTime() {
    const [data, setData] = useState('');
    const see = useAppSelector((state) => state);

    const loading = useAppSelector((state) => state.ui.loading);
    const errMsg = useAppSelector((state) => state.ui.errorMessage);
    const sketches = useAppSelector((state) =>
        Object.values(state[ENTITY_SLICE_NAME].lookup)
    );
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        dispatch(createEntity(data));
        setData('');
    };

    useSubmit(handleSubmit);

    useEffect(() => {
        dispatch(getAllEntities());
    }, []);

    const clearAll = () => {
        for (let i = 0, len = localStorage.length; i < len; i += 1) {
            logger.warn(`deleting key:${localStorage.key(i)}`);
            localStorage.removeItem(localStorage.key(i) ?? '');
        }
    };
    const logState = () => {
        logger.info(see);
    };

    return (
        <Navigations>
            <Container>
                <Padding />
                <Typography>All Time</Typography>
                <Typography>{`Loading: ${loading}`}</Typography>
                <Typography>{errMsg}</Typography>
                <Padding />
                <FormControl fullWidth>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <TextField
                        label="Data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={logState}>Log State</Button>
                    <Button onClick={clearAll}>Clear All</Button>
                </FormControl>
                <>
                    {sketches.map((s) => (
                        <SketchEntry data={s} key={s.ref} />
                    ))}
                </>
            </Container>
        </Navigations>
    );
}
