import React, { useState } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';
import { SketchPicker } from 'react-color';
import Texts from './CustomDrawing/text';
import URLImages from './CustomDrawing/URLImage';
import Header from './header';
import ImagePicker from './CustomDrawing/imagePicker';
import Portal from './CustomDrawing/Portal.js';
import TextInput from './CustomDrawing/textInput';
import Footer from './footer';

const Canvas = props => {
  const [tool, setTool] = React.useState('mouse');
  const [lines, setLines] = React.useState([]);
  const [currentText, setCurrentText] = React.useState([]);
  const [color, setColor] = React.useState('#df4b26');
  const [imageDisplay, setImageDisplay] = React.useState('true');
  const [inputDisplay, setInputDisplay] = React.useState('true');
  const [colorDisplay, setColorDisplay] = React.useState('true');
  const [icons, seticons] = React.useState(['https://dev.fuji.social/images/Arrow.png']);
  const [texts, setTexts] = React.useState([]);
  const [selectedId2, selectText] = React.useState(null);
  const [selectedId3, selectImage] = React.useState(null);
  const [imageClick, setImageClick] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [imageSize, setImageSize] = React.useState([]);
  const [savedState, saveState] = React.useState([]);
  const isDrawing = React.useRef(false);
  const stageRef = React.useRef();
  const dragUrl = React.useRef();

  const handleMouseDown = e => {
    if (tool === 'mouse') {
      isDrawing.current = false;
    } else {
      isDrawing.current = true;
    }
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, color, points: [pos.x, pos.y] }]);
  };

  const handleExportClick = data => {
    const dataURl = stageRef.current.getStage().toDataURL();
    const commentData = {
      stageData: data,
      commentData: dataURl,
      postId: props.selectedPicture.postId,
      userId: props.userParams.user_id
    };

    fetch('https://dev.fuji.social/api/upload-comment-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        updateUserStats();
        return json;
      })
      .catch(err => {
        console.error(err);
      });

  };

  const updateUserStats = () => {
    fetch('https://dev.fuji.social/api/updateUserStatsComments', {
      method: 'GET'
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        props.setView('postHome');
        return json;
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleMouseMove = e => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleChangeComplete = color => {
    setColor(color.hex);
  };

  const redoDrawing = () => {
    lines.splice(lines.length - 1);
  };

  const undoDrawing = e => {
    // setLines(lines[lines.length -1]);
    // let lastLine = lines[lines.length - 1];
    lines.splice(lines.length - 1);
    setLines(lines);
  };

  const saveText = textValue => {
    setTexts([...texts, {
      text: textValue,
      color: color
    }]);
  };

  const setImageDisplayFunction = () => {
    if (imageDisplay === 'false') {
      setImageDisplay('true');
    } else {
      setImageDisplay('false');
    }
    console.log(imageDisplay)
  };

  const changeImageClickNumber = () => {
    if(imageClick == 0){
      setImageClick(1)
    } else {
      setImageClick(0)
    }
  }



  const setTextDisplayFunction = () => {
    if (inputDisplay === 'false') {
      setInputDisplay('true');
    } else {
      setInputDisplay('false');
    }
  };

  const setColorPickerFunction = () => {
    if (colorDisplay === 'false') {
      setColorDisplay('true');
    } else {
      setColorDisplay('false');
    }
  };

  const setBrushTypeFunction = () => {
    if (tool === 'mouse') {
      setTool('pen');
      seticons(['https://dev.fuji.social/images/paint-brush.png']);
    } else if (tool === 'pen') {
      setTool('eraser');
      seticons(['https://dev.fuji.social/images/Eraser.png']);
    } else {
      setTool('mouse');
      seticons(['https://dev.fuji.social/images/Arrow.png']);
    }
  };

  const checkDeselect = e => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectText(null);
      selectImage(null);
    }
    handleMouseDown(e);
  };

  const saveStage = () => {
    const savedLines = lines;
    const savedText = texts;
    const savedImages = images;
    let data = [savedLines, savedText, savedImages];
    data = JSON.stringify(data);
    saveState(data);
    handleExportClick(data);
  };

  const loadStage = () => {
    const data = JSON.parse(savedState);
    setLines(data[0]);
    setTexts(data[1]);
    setImages(data[2]);
  };

  const handleSize = image => {
  };

  const saveImgSize = image => {
    setImageSize(imageSize.concat([image]));
  };

  return (
    <div className="container h-100">
      <div className="row">
        <Header />
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={setImageDisplayFunction}>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title mx-auto" id="exampleModalLabel">Select Image</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={setImageDisplayFunction}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {imageDisplay === 'false' ? <ImagePicker dragUrl={dragUrl} setImageClick={setImageClick} userParams={props.userParams} saveImgSize={saveImgSize} /> : <h1>No posts to view</h1>}
            </div>
            <div class="modal-footer mx-auto">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={changeImageClickNumber}>Clear</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
        {imageDisplay === 'false' ? <ImagePicker dragUrl={dragUrl} setImageClick={setImageClick} userParams={props.userParams} saveImgSize={saveImgSize} /> : null}
      </div> */}
      <div className="row h-75">
        <div
          className="col my-auto padding-0 canvasBorder"
          onTouchEnd={e => {
            // register event position
            stageRef.current.setPointersPositions(e);
            // add image
            if (imageClick !== 1) {
              setImages(
                images.concat([
                  {
                    ...stageRef.current.getPointerPosition(),
                    src: dragUrl.current,
                    width: 250,
                    height: 141
                  }
                ])
              );
              setImageClick(1);
            }
            setImageClick(1);
          }}
          onDrop={e => {
            // register event position
            stageRef.current.setPointersPositions(e);
            // add image
            setImages(
              images.concat([
                {
                  ...stageRef.current.getPointerPosition(),
                  src: dragUrl.current,
                  ref: image => {
                    handleSize(image);
                  }
                }
              ])
            );
          }}
          onDragOver={e => e.preventDefault()}
        >
          <Stage
            width={375}
            height={props.selectedPictureHeight.height}
            onMouseDown={checkDeselect}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            onTouchStart={checkDeselect}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            ref={stageRef}
          >
            <Layer>
              <Portal>
                <div style={{
                  position: 'absolute',
                  left: '23%',
                  top: '30%'
                }}>
                  {colorDisplay === 'false' ? <SketchPicker color={color} onChangeComplete={handleChangeComplete} /> : null}
                </div>
                <div style={{
                  position: 'absolute',
                  left: '90%',
                  top: '36%'
                }}>
                  <div className="btn-group-vertical">
                    <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#exampleModal" onClick={setImageDisplayFunction}>+</button>
                    <button type="button" className="btn btn-secondary" onClick={setTextDisplayFunction}>T</button>
                    <button type="button" className="btn btn-secondary" onClick={setBrushTypeFunction}><img src={icons} className="width100"></img></button>
                    <button type="button" className="btn btn-secondary" onClick={setColorPickerFunction}><img src="https://dev.fuji.social/images/ColorWheel.png" className="width100"></img></button>
                    <div className="btn-group dropleft width25" role="group">
                      <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle pull-left" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                      </button>
                      <div className="dropdown-menu text-center minWidth1" aria-labelledby="btnGroupDrop1">
                        <a className="dropdown-item" href="#" onClick={loadStage}>Load</a>
                        <a className="dropdown-item" href="#" onClick={saveStage}>Save</a>
                        <a className="dropdown-item" href="#" onClick={undoDrawing}>Undo</a>
                        <a className="dropdown-item" href="#" onClick={redoDrawing}>Redo</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{
                  position: 'absolute',
                  left: '15%',
                  top: '35%'
                }}>
                  {inputDisplay === 'false' ? <TextInput currentText={currentText} setCurrentText={setCurrentText} saveText={saveText} /> : null}
                </div>
              </Portal>
              <Text text="Just start drawing" x={125} y={props.selectedPictureHeight.height / 2} draggable={true} fontSize={20} />
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.color}
                  strokeWidth={5}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation={
                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                  }
                />
              ))}
              {texts.map((text, i) => (
                <Texts
                  key={i}
                  color={text.color}
                  text={text}
                  // x={text.x}
                  // y={text.y}
                  draggable={true}
                  textProps={text}
                  isSelected={text.id === selectedId2}
                  onSelect={() => {
                    selectText(text.id);
                  }}
                  onChange={newAttrs => {
                    const texts2 = texts.slice();
                    texts2[i] = newAttrs;
                    setTexts(texts2);
                  }}
                />
              ))}
            </Layer>
            <Layer>
              {images.map((image, i) => {
                return <URLImages
                  key={i}
                  image={image}
                  draggable={true}
                  imageProps={image}
                  isSelected={image.id === selectedId3}
                  onSelect={() => {
                    selectImage(image.id);
                  }}
                  onChange={newAttrs => {
                    const images2 = images.slice();
                    images2[i] = newAttrs;
                    setImages(images2);
                  }}
                />;
              })}
            </Layer>
          </Stage>
        </div>
        <Footer setView={props.setView} />
      </div>
    </div>
  );
};

export default Canvas;
