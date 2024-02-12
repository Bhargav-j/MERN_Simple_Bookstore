import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/spinner";
import axios from "axios";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    setLoading(true);
    const getBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        const book = response.data;
        setTitle(book.title)
        setAuthor(book.author)
        setPublishYear(book.publishYear)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        enqueueSnackbar('Error', {variant: 'error'})
      }
    };
    getBook();
  }, [id]);

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
      const response = await axios.put(`http://localhost:5000/books/${id}`, data);
      setLoading(false);
      enqueueSnackbar('Book Edited successfully', {variant: 'success'})
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      enqueueSnackbar('Error', {variant: 'error'})
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
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

          <button className="p-2 bg-sky-300 m-8" onClick={handleBookSave}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
