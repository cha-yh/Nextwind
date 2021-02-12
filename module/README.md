# framed-animation-on-scroll
This is a framed animation on scroll library for React.
<br>
Motivated by [iPhone 12 pro page](https://www.apple.com/iphone-12-pro/?afid=p238%7Cs3as1Krbs-dc_mtid_209254jz40384_pcrid_472722877628_pgrid_119804248508_&cid=wwa-kr-kwgo-iphone-Brand-Announce-General-)

## Core
`ContentsWrapper` makes your component be sticky on viewport in section. And `useScrollProgress` get scroll progress that how deep your component is in section. You can make framed-animation by the progress. And also you can control progress range for animation by `getWeightByProgress`.

## How it works
* Detect the viewport is in a section.
* Measure the progress of scroll in section with threshold value.
* Make interaction in progress range you want.

<br>

## Use
### `ContentsWrapper`
: It's a wrapper component for letting children component stick in viewport.

|Attribute|Description|Type|Default value|
|------|---|-------|---|
|ref|ref|MutableRefObject&lt;ContentsWrapperRefTypes&gt;|NOT_NULL|
|height|The height of the box that wrap a sticky box.|string &#124; undefined|"100%"|
|bgColor|The background color of ContentsWrapper component|string &#124; undefined|"black"|

----
<br>

### `useScrollProgress`
: It's for calculating the progress by how deep scroll is in a section with threshold value. And handling scroll event listner.

|Attribute|Description|Type|Default value|
|------|---|-------|---|
|ref|ref|MutableRefObject&lt;ContentsWrapperRefTypes&gt;|NOT_NULL|
|threshold|Specifying a ratio of intersection area to total bounding box area for the observed target|number(0~1) &#124; undefined|0.5|

----
<br>

### `getWeightByProgress`
: It's for calculating the weight value that you can use at interaction value(e.g: opacity value of css) by the progress range you want.

|Attribute|Description|Type|Default value|
|------|---|-------|---|
|start|The start point of progress that you want|number|NOT_NULL|
|end|The end point of progress that you want|number|NOT_NULL|
|progress|The progress value from `useScrollProgress`|number|NOT_NULL|
|min|The minimum weight value you want|number &#124; undefined|0|
|max|The maximum weight value you want|number &#124; undefined|1|

----
<br>

## Usage
```js 
import { useEffect, useRef, useState } from 'react';
import { ContentsWrapper, getWeightByProgress, useScrollProgress } from 'framed-animation-on-scroll';

function App() {
  const ref = useRef();
  const [progress] = useScrollProgress(ref, 0);

  const [opacityValue, setOpacityValue] = useState(0);

  useEffect(() => {
    //in 10~30% progress, opacity value will change 0.5 to 1
    setOpacityValue(getWeightByProgress(10, 30, progress, 0.5, 1).toFixed(3));
  }, [progress])
  return (
    <div className="App">
      <div style={{ position: "fixed", top: 0, left: 0, color: "white", zIndex: 999, fontSize: "30px" }}>Scroll progress in black section: {progress} %</div>

      <div style={{ height: "100vh", width: "100%", background: "gray" }} />

      {/* Usage */}
      <ContentsWrapper
        height="200vh"
        ref={ref}
      >
        <div
          style={{
            width: 300, height: 300, padding: 20, margin: 50, background: "green", color: "white", fontSize: "20px",
            opacity: opacityValue
          }}
        >
          <p>sticky contents</p>
          <p>in 10~30% progress, opacity value will change 0.5 to 1</p>
          <p>value: {opacityValue}</p>
        </div>
      </ContentsWrapper>

      <div style={{ height: "100vh", width: "100%", background: "gray" }} />
    </div>
  );
}

export default App;


````
![example](https://media4.giphy.com/media/nAY7v7WdzzB07TUVMG/giphy.gif)


----
<br>

## License
This project is licensed under the terms of the
[MIT license](https://github.com/cha-yh/Nextwind/blob/master/LICENSE.md).

