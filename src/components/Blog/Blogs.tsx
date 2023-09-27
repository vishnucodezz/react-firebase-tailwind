import { addDoc, collection } from 'firebase/firestore';
import FireStore from '../../firebase/fireStore';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import BlogTable from './BlogTable';

function Blogs() {
  const saveBlog = async (payload: { title: string; content: string }) => {
    try {
      const docRef = await addDoc(collection(FireStore, 'blogs'), {
        title: payload.title,
        content: payload.content,
        id: Date.now(),
      });
      console.log('Document written with ID: ', docRef.id);

      //   @ts-ignore
      document.getElementById('my_modal_3')!.close();
    } catch (e) {
      console.error('Error adding document: ', e);
      //   @ts-ignore
      document.getElementById('my_modal_3')!.close();
    }
  };
  return (
    <div className="bg-black font-mono  text-green-500 min-h-screen">
    <div className="flex w-full  ">
      <Header />
      <Modal save={saveBlog} />
    </div>
    <div>
    <BlogTable /> 
    </div>
    </div>
  );
}

export default Blogs;
