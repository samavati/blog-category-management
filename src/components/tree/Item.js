import React from 'react';

class Item extends React.Component {

    state = {
        expandable: this.props.expandable,
        expanded: false
    }

    render() {
        const { expandable, expanded } = this.state;
        return (
            <div className="ui list">
                {(expandable && !expanded) ? <i class="angle right icon"></i> : null}
                {(expandable && expanded) ? <i class="angle down icon"></i> : null}
                {this.props.children}
            </div>
        );
    }
}

export default Item;