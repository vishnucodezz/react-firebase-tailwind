import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import FireStore from '../../firebase/fireStore';

// Define an interface for your blog data
interface BlogData {
  title: string;
  createdAt: string;
  status: string; // Add a status property
}

const BlogTable = () => {
  const [blogTitles, setBlogTitles] = useState<BlogData[]>([]);

  useEffect(() => {
    const fetchBlogTitles = async () => {
      const blogTitlesData: BlogData[] = [];

      const querySnapshot = await getDocs(collection(FireStore, 'blogs'));

      querySnapshot.forEach((doc) => {
        const title = doc.data().title;
        const createdAtTimestamp = doc.data().id;
        const createdAt = convertTimestampToHumanDate(createdAtTimestamp);
        const status = doc.data().status || 'Active'; // Default status to "Active"
        blogTitlesData.push({ title, createdAt, status });
      });

      setBlogTitles(blogTitlesData);
    };

    fetchBlogTitles();

    const unsubscribe = onSnapshot(collection(FireStore, 'blogs'), (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          const title = change.doc.data().title;
          const createdAtTimestamp = change.doc.data().id;
          const createdAt = convertTimestampToHumanDate(createdAtTimestamp);
          const status = change.doc.data().status || 'Active'; // Default status to "Active"

          setBlogTitles((prevTitles) => {
            // Ensure the title is not already in the list before adding it
            if (!prevTitles.some((blog) => blog.title === title)) {
              return [...prevTitles, { title, createdAt, status }];
            }
            return prevTitles;
          });
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Function to convert a timestamp to a human-readable date
  const convertTimestampToHumanDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const toggleStatus = (title: string) => {
    // Find the blog post by title
    const updatedBlogTitles = blogTitles.map((blog) => {
      if (blog.title === title) {
        // Toggle the status
        const newStatus = blog.status === 'Active' ? 'Deactive' : 'Active';
        // Update the status in the local state
        return { ...blog, status: newStatus };
      }
      return blog;
    });

    setBlogTitles(updatedBlogTitles);
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="h-full border border-green-400 rounded-md bg-white min-h-">
        <table className="table-md">
          <thead>
            <tr>
              <th>S.No</th>
              <th>CreatedAt</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {blogTitles.map((blog, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{blog.createdAt}</td>
                <td>{blog.title}</td>
                <td>
                  <button onClick={() => toggleStatus(blog.title)}>
                    {blog.status === 'Active' ? 'Deactive' : 'Active'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogTable;
