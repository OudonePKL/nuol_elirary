import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import { useParams, useNavigate } from 'react-router-dom';
import './BookReader.css'; // Create and import a CSS file for custom styles

const BookReader = () => {
  const { id: book_id } = useParams(); // Destructure and rename `id` to `book_id`
  const navigate = useNavigate(); // Use useNavigate to navigate back
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/library/books/${book_id}/download-pdf/`,
          {
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust according to your auth mechanism
            },
          }
        );

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
  }, [book_id]);

  if (loading) {
    return <div>Loading PDF...</div>;
  }

  if (!pdfUrl) {
    return <div>Error loading PDF</div>;
  }

  // Set the worker URL
  GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

  return (
    <div className="book-reader-container">
      {/* <button className="back-button" onClick={() => navigate(-1)}>Back</button> */}
      <div className="pdf-viewer-wrapper">
        <Worker workerUrl={GlobalWorkerOptions.workerSrc}>
          <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
};

export default BookReader;
