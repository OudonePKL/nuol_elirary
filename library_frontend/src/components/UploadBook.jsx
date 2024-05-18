import { useState } from 'react';
import axios from 'axios';

const UploadBook = () => {
  const [cover, setCover] = useState(null);
  const [file, setFile] = useState(null);
  const [bookName, setBookName] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [categoryId, setCategoryId] = useState(1); // Default category id

  const handleCoverChange = (event) => {
    setCover(event.target.files[0]);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', bookName);
    formData.append('publication_date', publicationDate);
    formData.append('category', categoryId);
    formData.append('pdf', file);
    formData.append('cover', cover);

    try {
      const response = await axios.post('http://127.0.0.1:8000/library/books/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust according to your auth mechanism
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Book Name:</label>
        <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} required />
      </div>
      <div>
        <label>Publication Date:</label>
        <input type="text" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} required />
      </div>
      <div>
        <label>Category ID:</label>
        <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />
      </div>
      <div>
        <label>Upload Cover Image:</label>
        <input type="file" onChange={handleCoverChange} required />
      </div>
      <div>
        <label>Upload PDF:</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Upload Book</button>
    </form>
  );
};

export default UploadBook;
