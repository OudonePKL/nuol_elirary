
import axios from 'axios';

const DownloadButton = ({ bookId }) => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/books/${bookId}/download-pdf/`, {
        responseType: 'blob', // Important to specify this to handle binary data
        headers: {
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2MDA5NTg5LCJpYXQiOjE3MTYwMDk1MjksImp0aSI6ImQzMmU5ZWZmOWE4YjQ4NDc4MWM5NDMyNzk2NjVlOGIxIiwidXNlcl9pZCI6Mn0.HSIC-Iz2zu3fmdMHlKHityvFPfN8ftyHwSzJqZWbXpM`, // Adjust as per your auth mechanism
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust as per your auth mechanism
        },
      });

      // Create a URL for the blob and set it as the href attribute
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${bookId}.pdf`); // Name the file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('There was an error downloading the file!', error);
    }
  };

  return (
    <button onClick={handleDownload}>Download PDF</button>
  );
};

export default DownloadButton;
