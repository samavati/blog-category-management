import React from 'react';

class Item extends React.Component {

    state = {
        expandable: this.props.expandable,
        expanded: false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.expandable !== prevState.expandable) {
            return {
                expandable: nextProps.expandable,
            };
        }

        return null;
    }

    tuggleExpand() {
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        const { expandable, expanded } = this.state;
        const { name, id } = this.props;
        const icon = expanded ? <i className="angle down icon"></i> : <i className="angle right icon"></i>;

        return (
            <div
                className="item"
                style={!expandable ? { marginLeft: '1.43rem' } : null}
                draggable
                onDragStart={(e) => { this.props.onDragStart(e, id) }}
                onDragOver={(e) => { this.props.onDragOver(e) }}
                onDrop={(e) => { this.props.onDrop(e, id) }}
            >
                <div style={{ display: 'inline' }} onClick={() => { this.tuggleExpand() }}>
                    {expandable ? icon : null}
                </div>
                <button
                    className="mini red ui circular trash icon button"
                    type="button"
                    onClick={() => { this.props.delete(id) }}>
                    <i className="trash icon"></i>
                </button>

                <button
                    className="mini green ui circular icon button"
                    type="button">
                    <i className="plus icon"></i>
                </button>

                {name}
                {expanded ? this.props.children : null}
            </div>
        );
    }
}

export default Item;