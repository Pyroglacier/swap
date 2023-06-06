import axios from 'axios';

import { BASE_URL } from '../../../config';
import { logger } from '../../../utils';
import { Command, Response } from '../../nodes/api/types';
import { BackendNode } from '../../nodes/models';

import { PersistentStorage } from './interfaces';

export const DatabaseStorage: PersistentStorage = class DatabaseStorage {
    static async submit(
        input: Command<BackendNode>[]
    ): Promise<Response<BackendNode>[]> {
        const url = `${BASE_URL}/command`;

        logger.info('input', input);
        const data: Response<BackendNode>[] = await axios
            .post(url, input)
            .then((res) => res.data);
        logger.info('data', data);

        return data.filter((d) => d.success);
    }
};
