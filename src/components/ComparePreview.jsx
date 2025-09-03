import { useState, useRef } from 'react';
import { RxUpload } from "react-icons/rx";
import { FaDownload, FaSpinner } from "react-icons/fa";
import { removeBackground } from '@imgly/background-removal';

const ComparePreview = ({ onImageSaved }) => {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageUrl = e.target.result;
      setOriginalImage(imageUrl);
      setProcessedImage(null);
      
      // Process the image
      setIsProcessing(true);
      try {
        const blob = await removeBackground(imageUrl);
        const processedUrl = URL.createObjectURL(blob);
        setProcessedImage(processedUrl);
        
        // Save to user's collection if callback provided
        if (onImageSaved) {
          onImageSaved(imageUrl, processedUrl);
        }
      } catch (error) {
        console.error('Error removing background:', error);
        alert('Failed to remove background. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'background-removed.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetImages = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div id="upload-section" className="mx-4 lg:mx-44 max-sm:mt-16 sm:mt-17 lg:mt-30 bg-gray-50">
      <div className="text-center mb-12 bg-gray-50">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-4">
          Remove Background from Your Image
        </h2>
        <p className="text-gray-500 text-lg">
          Upload an image and see the magic happen in seconds
        </p>
      </div>

      {!originalImage ? (
        // Upload Area
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-violet-500 bg-violet-50' 
              : 'border-gray-300 hover:border-violet-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full flex items-center justify-center">
              <RxUpload className="text-white text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Drop your image here or click to upload
              </h3>
              <p className="text-gray-500 mb-4">
                Supports JPG, PNG, and other common image formats
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex gap-3 px-8 py-3 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-medium hover:scale-105 transition-all duration-300"
              >
                <RxUpload className="text-xl"/>
                Choose Image
              </button>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        // Image Comparison Area
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Original Image */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                Original Image
              </h3>
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-auto max-h-96 object-contain mx-auto"
                />
              </div>
            </div>

            {/* Processed Image */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                Background Removed
              </h3>
              <div className="relative bg-gray-100 rounded-lg overflow-hidden min-h-48">
                {isProcessing ? (
                  <div className="flex items-center justify-center h-48">
                    <div className="text-center">
                      <FaSpinner className="animate-spin text-4xl text-violet-600 mx-auto mb-4" />
                      <p className="text-gray-600">Removing background...</p>
                    </div>
                  </div>
                ) : processedImage ? (
                  <div 
                    className="relative"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='%23f3f4f6' fill-opacity='1' fill-rule='evenodd'%3e%3cpath d='m0 0h10v10h-10z'/%3e%3c/g%3e%3c/svg%3e")`,
                      backgroundSize: '20px 20px'
                    }}
                  >
                    <img
                      src={processedImage}
                      alt="Background Removed"
                      className="w-full h-auto max-h-96 object-contain mx-auto"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48">
                    <p className="text-gray-500">Processing will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={resetImages}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-gray-400 hover:scale-105 transition-all duration-300"
            >
              Upload New Image
            </button>
            
            {processedImage && !isProcessing && (
              <button
                onClick={downloadImage}
                className="inline-flex gap-3 px-8 py-3 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-medium hover:scale-105 transition-all duration-300"
              >
                <FaDownload className="text-lg"/>
                Download Result
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePreview;