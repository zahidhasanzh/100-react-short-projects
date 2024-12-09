import "./App.css";
import Accordian from "./components/accordion/Accourdion";
import ImageSlider from "./components/image-slider/ImageSlider";
import LoadMore from "./components/load-more-data/LoadMore";
import QrCode from "./components/qr-code-generator/QrCode";
import RandomColor from "./components/random-color/RandomColor";
import StarRating from "./components/star-rating/StarRating";
import menus from "./components/tree-view/data";
import TreeView from "./components/tree-view/TreeView";

function App() {
  return (
    <>
      <div className="App">
        {/* Accordion */}
        {/* <Accordian/> */}

        {/* Random color Generate */}
        {/* <RandomColor/> */}

        {/* Star Rating */}
        {/* <StarRating/> */}

        {/* Image slider component */}

        {/* <ImageSlider
          url={"https://picsum.photos/v2/list"}
          page={"1"}
          limit={"10"}
        /> */}

        {/* Lode more Product component */}
         {/* <LoadMore/> */}

          {/* Tree view component/ menu ui component / recursive navigation  menu*/}
          {/* <TreeView menus={menus}/> */}

          {/* Qr Code generator component */}
          <QrCode/>
      </div>
    </>
  );
}

export default App;
