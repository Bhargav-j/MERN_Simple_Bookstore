import { useState } from "react";
import {useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/spinner";
import axios from "axios";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleBookSave = async () => {

    if(!title || !author || !publishYear){
      enqueueSnackbar('Fill all the Details', {variant: 'error'})
      return
    }

    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/books", data);
      setLoading(false);
      enqueueSnackbar('Book Created successfully', {variant: 'success'})
      navigate("/")
    } catch (error) {
      console.log(error);
      setLoading(false);
      enqueueSnackbar('Error', {variant: 'error'})
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-grey-500">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-grey-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-grey-500">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-grey-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-grey-500">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-grey-500 px-4 py-2 w-full"
            />
          </div>

          <button className="p-2 bg-sky-300 m-8" onClick={handleBookSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default CreateBook;
