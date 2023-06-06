import { Action, ICreateCommand, IDeleteCommand } from '@argens1203/swap-model';
import { generate as uuid } from 'short-uuid';

import { logger } from '../../../../utils';
import { Command, Response } from '../../../nodes/api/types';
import { BackendNode } from '../../../nodes/models';
import { PersistentStorage } from '../interfaces';

import { ResponseFactory } from './response-factory.util';
import { StorageDelegate } from './storage-delagate.util';

export const WebLocalStorage: PersistentStorage = class WebLocalStorage {
    static async submit(
        input: Command<BackendNode>[]
    ): Promise<Response<BackendNode>[]> {
        const res = input.map(WebLocalStorage.handleCommand).flat(20);
        logger.info(res);
        return res;
    }

    static handleCommand(
        command: Command<BackendNode>
    ): Response<BackendNode>[] {
        const { action } = command;
        logger.info(command);
        logger.info(action);
        switch (action) {
            case Action.CREATE:
                return WebLocalStorage.create(
                    command as ICreateCommand<BackendNode>
                );
            case Action.SCAN:
                return WebLocalStorage.scan();
            case Action.QUERY:
                return WebLocalStorage.query(command);
            case Action.DELETE:
                return WebLocalStorage.delete(
                    command as IDeleteCommand<BackendNode>
                );
            default:
                return [];
        }
    }

    static generateRef(): string {
        return uuid();
    }

    static create(
        command: ICreateCommand<BackendNode>
    ): Response<BackendNode>[] {
        const { data, nodeType } = command;
        const backendNode = new BackendNode({
            ref: this.generateRef(),
            nodeType,
            ...data,
        });
        StorageDelegate.saveNode(backendNode);
        return [ResponseFactory.toCreateResponse(backendNode)];
    }

    static scan(): Response<BackendNode>[] {
        const nodes = StorageDelegate.getAllNodes();
        return [ResponseFactory.toScanResponse(nodes)];
    }

    static query(a: any): Response<BackendNode>[] {
        const nodes = StorageDelegate.getAllNodes();
        return [ResponseFactory.toQueryResponse(nodes)];
    }

    static delete(
        command: IDeleteCommand<BackendNode>
    ): Response<BackendNode>[] {
        const { data, nodeType } = command;
        const { ref } = data;
        StorageDelegate.deleteNode(ref);
        return [ResponseFactory.toDeleteResponse(nodeType, ref)];
    }
};
