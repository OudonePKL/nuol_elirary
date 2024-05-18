import React from 'react';
import PDFViewer from './PDFViewer';

const BookReader = ({ book }) => {
  return (
    <div>
      <h1>{book.name}</h1>
      <p>Category: {book.category.name}</p>
      <p>Publication Date: {book.publication_date}</p>
      {/* Other book details */}

      {/* PDF Viewer */}
      <PDFViewer bookId={book.id} />
    </div>
  );
};

export default BookReader;
