import { Queue } from './queue';
import { TreeNode } from './treenode';

export class TreeStructure {

    constructor() {
        this.incrementalId = 1;
        this.root = new TreeNode(null, 0);
    }

    static initWithData(data) {
        const tree = new TreeStructure();

        function fillTree(parent, node) {
            const childNode = new TreeNode(node.value, tree.idGenerator(), parent);
            parent.pushNode(childNode, tree.idGenerator());
            if (node.children.length) {
                node.children.forEach(child => {
                    fillTree(childNode, child)
                })
            }
        }

        data.forEach(d => fillTree(tree.root, d));

        return tree;
    }

    /**
     * function for make incremental id
     */
    idGenerator() {
        return this.incrementalId++;
    }

    /**
     * Breadth First Search for specific node with id
     * @param {Number} id id of the node we want to find
     */
    BFS(id) {
        const queue = new Queue();
        let node = this.root;
        queue.enqueue(node);

        while (queue.size > 0) {
            node = queue.dequeue();
            if (node.id === id) { break; }
            if (node.children.length) {
                node.children.forEach(child => {
                    queue.enqueue(child);
                });
            }
        }

        return node.id === id ? node : null;
    }

    /**
     * Add new Node in specific index of Parent Node Childrens.
     * @param {Number} parentId 
     * @param {any} value 
     * @param {Number} index 
     */
    add(parentId, value, index) {
        const parent = this.BFS(parentId);
        if (parent !== null) {
            parent.addNode(value, index, this.idGenerator())
        }
    }

    /**
     * Remove element that has specified id
     * @param {NUmber} id 
     */
    remove(id) {
        const element = this.BFS(id);
        if (element !== null) {
            const index = element.parent.children.findIndex(child => child.id === id);
            element.parent.removeNode(index)
            return element;
        }
        return null;
    }

    move(id, toId) {
        const element = this.remove(id);
        const parentTo = this.BFS(toId);

        if (element && parentTo) {
            element.parent = parentTo;
            parentTo.pushNode(element);
            return true;
        }

        return false;
    }
}