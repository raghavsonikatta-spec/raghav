
import React, { useState, useCallback } from 'react';
import { removeBackground } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { UploadIcon, MagicWandIcon, ImageIcon, LoadingSpinner } from './components/Icons';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImage(file);
      setOriginalImageUrl(URL.createObjectURL(file));
      setResultImageUrl(null);
      setError(null);
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultImageUrl(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImage);
      const resultBase64 = await removeBackground(base64, mimeType);
      setResultImageUrl(`data:image/png;base64,${resultBase64}`);
    } catch (e) {
      console.error(e);
      setError("Failed to remove background. Please try another image or check your API key.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            AI Background Remover
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            Upload an image and let Gemini AI magically remove the background for you.
          </p>
        </header>

        <main className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="bg-gray-800/50 rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-700 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Original Image</h2>
              <div className="w-full h-80 bg-gray-900/70 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600 mb-6 relative overflow-hidden">
                {originalImageUrl ? (
                  <img src={originalImageUrl} alt="Original" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center text-gray-500">
                    <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                    <p>Your uploaded image will appear here</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <label htmlFor="file-upload" className="w-full sm:w-auto cursor-pointer flex-grow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <UploadIcon className="w-5 h-5" />
                  <span>{originalImage ? 'Change Image' : 'Upload Image'}</span>
                </label>
                <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                
                <button
                  onClick={handleGenerate}
                  disabled={!originalImage || isLoading}
                  className="w-full sm:w-auto flex-grow bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <LoadingSpinner className="w-5 h-5" />
                  ) : (
                    <MagicWandIcon className="w-5 h-5" />
                  )}
                  <span>{isLoading ? 'Processing...' : 'Remove Background'}</span>
                </button>
              </div>
            </div>

            {/* Output Panel */}
            <div className="bg-gray-800/50 rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-700 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Result</h2>
              <div
                className="w-full h-80 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600 relative overflow-hidden"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, #374151 25%, transparent 25%),
                    linear-gradient(-45deg, #374151 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #374151 75%),
                    linear-gradient(-45deg, transparent 75%, #374151 75%)`,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                }}
              >
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-900/80 flex flex-col items-center justify-center transition-opacity duration-300">
                    <LoadingSpinner className="w-10 h-10 mb-4" />
                    <p className="text-gray-300">Removing background...</p>
                  </div>
                )}
                {error && (
                  <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center p-4 text-center">
                    <p className="text-red-300">{error}</p>
                  </div>
                )}
                {resultImageUrl && !isLoading && (
                  <img src={resultImageUrl} alt="Result" className="w-full h-full object-contain" />
                )}
                {!resultImageUrl && !isLoading && !error && (
                   <div className="text-center text-gray-500">
                    <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                    <p>Your result will be shown here</p>
                  </div>
                )}
              </div>
               {resultImageUrl && !isLoading && (
                  <a
                    href={resultImageUrl}
                    download="background_removed_image.png"
                    className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Download Image
                  </a>
                )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
