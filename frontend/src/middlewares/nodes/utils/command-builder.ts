import {
    Action,
    NodeType,
    DataType,
    ICreateCommand,
} from '@argens1203/swap-model';

import { Command } from '../api/types';
import { BackendNode } from '../models';

export class CommandBuilder {
    constructor(nodeType: NodeType) {
        this.nodeType = nodeType;
    }

    commands: Command<BackendNode>[] = [];

    nodeType: NodeType;

    getCommand() {
        return this.commands;
    }

    deleteEntity(ref: string) {
        this.commands.push({
            nodeType: this.nodeType,
            action: Action.DELETE,
            data: {
                ref,
            },
        });
        return this;
    }

    createEntity(data: ICreateCommand<BackendNode>['data']) {
        this.commands.push({
            nodeType: this.nodeType,
            action: Action.CREATE,
            data,
        });
        return this;
    }

    scanEntity() {
        this.commands.push({
            nodeType: this.nodeType,
            action: Action.SCAN,
        });
        return this;
    }
}
