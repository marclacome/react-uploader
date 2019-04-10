import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import {NativeTypes} from 'react-dnd-html5-backend';

class Target extends Component{
    render(){
   //    const { isOver, connectDropTarget, droppedItem } = this.props;
       let className = this.props.isOver ? 'drag_drop_over':'drag_drop_normal';
        return this.props.connectDropTarget(
            <div className={`target ${className}`}>
            OR DRAG FILES HERE
            </div>
        )
    }
}

const fileTarget = {
    drop(props, monitor, component){
        const item = monitor.getItem().files
        props.onDrop(item)
    }
}
function collect(connect, monitor) {
  return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
  };
}

export default DropTarget(NativeTypes.FILE, fileTarget, collect)(Target);