import { notEmpty, range } from '../../../../utils';
import { BackendNode } from '../../../nodes/models';

const PREFIX = 'NODE#';

export class StorageDelegate {
    static refToKey(ref: string) {
        return `${PREFIX}${ref}`;
    }

    static saveNode(node: BackendNode) {
        localStorage.setItem(
            StorageDelegate.refToKey(node.ref),
            JSON.stringify(node)
        );
    }

    static deleteNode(ref: BackendNode['ref']) {
        localStorage.removeItem(this.refToKey(ref));
    }

    static getAllNodes() {
        const arr = range(localStorage.length);
        const allKeys = arr.map((i) => localStorage.key(i));
        const keys = allKeys
            .filter(notEmpty)
            .filter((k) => k.startsWith(PREFIX));
        const strings = keys
            .map((k) => localStorage.getItem(k))
            .filter(notEmpty);
        const items = strings.map((s) => JSON.parse(s));
        return items;
    }
}
