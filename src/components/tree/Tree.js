import React from 'react';
import './Tree.scss';
import Item from './Item';
import { TreeStructure } from './lib/tree';

class Tree extends React.Component {

    state = {
        tree: TreeStructure.initWithData(this.props.data)
    }

    deleteNode(id) {
        const { tree } = this.state;
        tree.remove(id);
        this.setState({ tree })
    }

    renderTree(node) {
        return (
            <div class="ui list">
                {node.children.map(child => {
                    return (
                        <Item key={child.id} expandable={child.children.length > 0}>

                            <button
                                className="mini red ui circular trash icon button"
                                type="button"
                                onClick={() => { this.deleteNode(child.id) }}>
                                <i className="trash icon"></i>
                            </button>

                            <button
                                className="mini green ui circular icon button"
                                type="button">
                                <i className="plus icon"></i>
                            </button>

                            {child.value}
                            {child.children.length ? this.renderTree(child) : null}
                        </Item>
                    );
                })}
            </div>
        );
    }

    render() {
        return (
            this.renderTree(this.state.tree.root)
        );
    }
}

export default Tree;