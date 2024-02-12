import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/spinner";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar();

  const handleDeleteBook = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5000/books/${id}`);
      setLoading(false);
      enqueueSnackbar('Book Deleted successfully', {variant: 'success'})
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
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl">
            Are You Sure You Want to delete this Book?
          </h3>
          <button
            className="p-4 bg-red-600 text-white m-8 w-full"
            onClick={handleDeleteBook}
          >
            Yes!, Delete it.
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
