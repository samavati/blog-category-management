/**
 * Represents a node in the tree
 */
export class TreeNode {
    constructor(value, id, parentNode = null) {
        this.children = [];
        this.value = value;
        this.id = id;
        this.parent = parentNode;
    }

    /**
     * Add new children in specific index of children array.
     * @param {any} value 
     * @param {Number} index 
     */
    addNode(value, index, id) {
        const node = new TreeNode(value, id, this);
        this.children.splice(index, 0, node);
        return { node, index }
    }

    pushNode(node) {
        this.children.push(node);
        return { node }
    }

    /**
     * remove children in specified index
     * @param {Number} index 
     */
    removeNode(index) {
        this.children.splice(index, 1);
    }
}