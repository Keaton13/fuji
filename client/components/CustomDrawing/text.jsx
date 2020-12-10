import React from 'react';
import { Text, Transformer } from 'react-konva';

const Texts = ({ color, text, isSelected, onSelect, onChange }) => {
  const textRef = React.useRef();
  const trRef = React.useRef();
  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Text
        fill={color}
        text={text}
        scaleX={1}
        scaleY={1}
        fontSize={40}
        x={text.x}
        y={text.y}
        onClick={onSelect}
        onTap={onSelect}
        ref={textRef}
        {...text}
        draggable={true}
        onDragEnd={e => {
          onChange({
            ...text,
            x: e.target.x(),
            y: e.target.y()
          });
        }}
        onTransformEnd={e => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = textRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...text,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY)
          });
        }}
        dragBoundFunc={e => {
          let newX = null;
          let newY = null;
          // Add window.height and window.Width so size isnt hard coded
          if (e.x > 279) {
            newX = e.x > 279 ? 279 : e.x;
          } else {
            newX = e.x < -60 ? -60 : e.x;
          }
          if (e.y > window.innerHeight - 150) {
            newY = e.y > window.innerHeight - 150 ? window.innerHeight - 150 : e.y;
          } else {
            newY = e.y < 0 ? 0 : e.y;
          }
          return {
            x: newX,
            y: newY
          };
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Texts;
