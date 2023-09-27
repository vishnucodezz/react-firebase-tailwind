import { useAuthState } from 'react-firebase-hooks/auth';
import FirebaseAuth from '../../firebase/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { FaReact, } from 'react-icons/fa';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { BsFire } from 'react-icons/bs';

const Header = () => {
  const [user, loading] = useAuthState(FirebaseAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate('/');
    }
  }, [user, loading]);
  if (loading) return <div>Loading...</div>;

  const handleLogout = async () => {
    await signOut(FirebaseAuth);
    // navigate('/');
  };

  return (
    <div className="navbar bg-gray-900 ">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl"><FaReact className="inline-block  text-sky-500" /><HiOutlinePlusSm className="inline-block" />  <BsFire className="inline-block mr-2 text-red-500" /> Blog</a>
      </div>
      <div className="flex-none">
        <div
          onClick={() => {
            // @ts-ignore
            document.getElementById('my_modal_3')!.showModal();
          }}
        >
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
          </label>
        </div>
        <div className="dropdown dropdown-end ">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-green-400">
            <div className="w-10 rounded-full">
              <img src={user?.photoURL || ''} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="border menu menu-sm dropdown-content bg-gray-900  mt-3 z-[1] p-2 shadow rounded-box w-52"
          >
            <li>
              <a className="ml-2 text-base hover:text-red-500">
                Name: 
                { <span>{user?.displayName}</span> }
              </a>
            </li>

            <li>
              <button
                className="text-base ml-2 hover:text-red-600"
                onClick={() => {
                  /*handle signout*/
                  handleLogout();
                }}
              >
                Logout
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
