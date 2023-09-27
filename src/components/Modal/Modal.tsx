import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import FirebaseAuth from '../../firebase/firebaseAuth';

type Props = {
  save: (payload: { title: string; content: string }) => void;
};

const Modal = ({ save }: Props) => {
  const [blog, setBlog] = useState({ title: '', content: '' });
  const [user] = useAuthState(FirebaseAuth);

  const handleInput = (name: string, value: string) => {
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    return () => {
      setBlog({ title: '', content: '' });
    };
  }, [setBlog]);

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box  overflow-hidden bg-gray-900 border border-green-400">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">User Data{" {"}</h3>

        
        <div className="text-green-400">
          <ul>
          <li>
              <a className="">
                Email: 
                { <span className="ml-2 text-sm" >{user?.email}{","}</span> }
              </a>
            </li>
            <li>
              <a >
                ID: 
                { <span className="ml-2 text-sm">{user?.uid}{","}</span> }
              </a>
            </li>
            <h3>{"}"}</h3>
          </ul>
        </div>
        <div className="form-control  ">
        <h3 className="font-bold text-lg mt-5">Post a New Blog</h3>
          <label className="label">
            <span className="label-text text-green-400 ">What is your blog title?</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered"
            name="title"
            onChange={(e) => handleInput('title', e.currentTarget.value)}
          /> 
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-green-400 ">Your blog content</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Bio"
            name="content"
            onChange={(e) => handleInput('content', e.currentTarget.value)}
          ></textarea>
        </div>
        <div className="form-control mt-6 text-green-400 ">
          <button
            className="btn btn-primary border border-green-400 bg-transparent text-green-400 hover:bg-green-400 hover:border-green-600 hover:text-black"
            onClick={() => {
              save(blog);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
