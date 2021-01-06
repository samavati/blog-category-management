import React from 'react';

class Item extends React.Component {

    state = {
        expandable: this.props.expandable,
        expanded: false
    }

    render() {
        const { expandable, expanded } = this.state;
        let content;

        if (expandable) {
            expanded ? content = (<div className="ui list">
                <i class="angle down icon"></i>
                {this.props.children}
            </div>) : content = (<div className="ui list">
            <i class="angle right icon"></i>
                {this.props.children}
            </div>)
        } else {
            content = null;
        }

        return (
            <>
                {content}
            </>
        );
    }
}

export default Item;