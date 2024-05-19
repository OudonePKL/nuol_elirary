import { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';
import { GlobalWorkerOptions } from 'pdfjs-dist';

const PDFViewer = ({ bookId }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/library/books/${bookId}/download-pdf/`, {
          responseType: 'blob',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust according to your auth mechanism
          },
        });

        // Create a URL for the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        setPdfUrl(url);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching PDF:', error);
        setLoading(false);
      }
    };

    fetchPDF();
  }, [bookId]);

  if (loading) {
    return <div>Loading PDF...</div>;
  }

  if (!pdfUrl) {
    return <div>Error loading PDF</div>;
  }

  // Set the worker URL
  GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  return (
    <div style={{ height: '750px' }}>
      <Worker workerUrl={GlobalWorkerOptions.workerSrc}>
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    </div>
  );
};

export default PDFViewer;
