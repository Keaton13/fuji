import React from 'react';
import useImage from 'use-image';
import { Image, Transformer } from 'react-konva';

const URLImage = ({ image, isSelected, onSelect, onChange }) => {
  const [img] = useImage(image.src);
  const imgRef = React.useRef();
  const trRef = React.useRef();
  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (
    <React.Fragment>
      <Image
        className={'mw-25'}
        draggable={true}
        image={img}
        x={image.x}
        y={image.y}
        scaleX={1}
        scaleY={1}
        // I will use offset to set origin to the center of the image
        offsetX={img ? image.width / 2 : 0}
        offsetY={img ? image.height / 2 : 0}
        onClick={onSelect}
        onTap={onSelect}
        ref={imgRef}
        {...image}
        onDragEnd={e => {
          onChange({
            ...image,
            x: e.target.x(),
            y: e.target.y()
          });
        }}
        dragBoundFunc={e => {
          let newX = null;
          let newY = null;
          // Add window.height and window.Width so size isnt hard coded
          if (e.x > 420) {
            newX = e.x > 420 ? 420 : e.x;
          } else {
            newX = e.x < 0 ? 0 : e.x;
          }
          if (e.y > 420) {
            newY = e.y > window.innerHeight - 125 ? window.innerHeight - 125 : e.y;
          } else {
            newY = e.y < 0 ? 0 : e.y;
          }
          return {
            x: newX,
            y: newY
          };
        }}
        onTransformEnd={e => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = imgRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...image,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY)
          });
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

export default URLImage;
