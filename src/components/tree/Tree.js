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

    ondragOver(e) {
        e.preventDefault();
    }

    onDragStart(ev, elementId) {
        ev.stopPropagation();
        ev.dataTransfer.setData("id", elementId);
        console.log(elementId)
    }

    onDrop(ev, toId) {
        const { tree } = this.state;
        const elementId = +ev.dataTransfer.getData("id");
        if (elementId !== toId) {
            tree.move(elementId, toId);
            this.setState({ tree })
        }
    }

    renderTree(node) {
        return (
            <div className="ui list">
                {node.children.map(child => {
                    return (
                        <Item
                            key={child.id}
                            expandable={child.children.length > 0}
                            name={child.value}
                            id={child.id}
                            delete={this.deleteNode.bind(this)}
                            onDragStart={this.onDragStart.bind(this)}
                            onDragOver={this.ondragOver.bind(this)}
                            onDrop={this.onDrop.bind(this)}
                        >
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