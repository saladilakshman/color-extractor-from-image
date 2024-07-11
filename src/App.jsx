import { useEffect, useState } from "react";
import { extractColors } from "extract-colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
const App = () => {
  const [imagesource, setImagesource] = useState(null);
  const [imagelink, setImagelink] = useState(null);
  const [colorslist, setColorslist] = useState([]);
  const imageselection = () => {
    const imageselectorelement = document.getElementById("image-select");
    setImagesource(() => URL.createObjectURL(imageselectorelement.files[0]));
    setImagelink(null);
  };
  const colorextraction = () => {
    extractColors(imagesource || imagelink, { crossOrigin: "anonymous" })
      .then((colors) => {
        setColorslist(colors);
      })
      .catch(console.error);
  };
  return (
    <div className="w-full px-4 lg:px-80 py-10 ">
      <ToastContainer position="bottom-left" />
      <input
        type="url"
        placeholder="Past Image link here.."
        value={imagelink}
        onChange={(e) => {
          setImagelink(e.target.value);
          setImagesource(null);
        }}
        className="border border-gray-200 bg-white shadow-xl w-full md:w-2/3 h-10 rounded-lg px-3 focus:outline-none block mx-auto placeholder:text-neutral-950"
      />
      <h3 className="text-xl text-center py-5">(Or)</h3>
      <div className="flex justify-center items-center mb-8">
        <label htmlFor="image-select">
          <input
            type="file"
            id="image-select"
            accept="image/*"
            className="w-0 invisible bg-blue-400"
            onChange={imageselection}
          />
          <span className="text-nowrap bg-neutral-600 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg drop-shadow-lg">
            Choose Image
          </span>
        </label>
      </div>
      <img
        src={imagesource || imagelink}
        alt=""
        className=" size-48 lg:size-80 block mx-auto object-contain ring-1 ring-sky-300"
      />
      <button
        className="capitalize px-4 py-2 rounded-full drop-shadow-lg outline-black bg-stone-500 text-white block mx-auto mt-4"
        onClick={colorextraction}
      >
        Extract colors
      </button>
      <div className="flex flex-wrap justify-start items-center gap-2 my-6">
        {colorslist.map((col, index) => {
          return (
            <div
              key={index}
              className="size-12 lg:size-20 rounded-full text-transparent"
              style={{
                backgroundColor: col.hex,
              }}
              onClick={() => {
                navigator.clipboard.writeText(col.hex);
                toast("color copied!");
              }}
            >
              {col.hex}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
