import { useState } from "react";
import axios from "axios";

// sends image and description to server
async function postImage({ image, description }) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("description", description);

  // result of when we make the call to our server.
  const result = await axios.post(
    "http://localhost:5000/api/images",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return result.data;
}

// React component for UploadImage
function UploadImage() {
  // Declare states
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  // Submit function
  const submit = async (event) => {
    event.preventDefault();

    let result;
    try {
      result = await postImage({ image: file, description });
    } catch (e) {
      console.log(e);
    }
    console.log(result);
    // setImages is the function that modifys the state of images.
    setImages([result.Key, ...images]);
    console.log(images);
  };

  // Event for when the user selects a file to upload.
  const fileSelected = (event) => {
    console.log(event);
    const selectedFile = event.target.files[0];
    // setFile is the function that modifys the state of file.
    setFile(selectedFile);
  };

  return (
    <div className="UploadImage">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {images.map((image) => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))}
    </div>
  );
}

export default UploadImage;
