import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Zap, Loader2, CheckCircle, XCircle, Info, RotateCcw, Trash2 } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const CalorieCounter = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isCamera, setIsCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image file is too large. Please select an image under 10MB');
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setImage(base64);
      setImagePreview(base64);
      setError(null);
      setSuccess(false);
      setNutritionData(null);
      event.target.value = '';
    } catch (err) {
      console.error('Error processing file:', err);
      setError('Failed to process image. Please try a different file.');
    }
  };

  const startCamera = async () => {
    try {
      setError(null);
      setLoading(true);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported in this browser');
      }

      const constraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setIsCamera(true);
      setLoading(false);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(e => {
              console.error('Error playing video:', e);
              setError('Failed to start camera preview');
            });
          };
        }
      }, 100);
    } catch (err) {
      setLoading(false);
      setError(
        err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
          ? 'Please allow camera permissions and try again.'
          : err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError'
          ? 'No camera found on this device.'
          : 'Unable to access camera. Please check permissions or try uploading a file.'
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      setError('Camera not ready. Please try again.');
      return;
    }

    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        setError('Camera not ready. Please wait a moment and try again.');
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setImage(imageDataUrl);
      setImagePreview(imageDataUrl);
      setError(null);
      setSuccess(false);
      setNutritionData(null);
      stopCamera();
    } catch (err) {
      setError('Failed to capture photo. Please try again.');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDeletePhoto = () => {
    setImage(null);
    setImagePreview(null);
    setNutritionData(null);
    setError(null);
    setSuccess(false);
    stopCamera();
  };

  const handleRetakePhoto = () => {
    setImage(null);
    setImagePreview(null);
    setNutritionData(null);
    setError(null);
    setSuccess(false);
    startCamera();
  };

  const handleSubmit = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('You must be logged in to analyze images');
        setTimeout(() => navigate('/login'), 2000);
        setLoading(false);
        return;
      }

      const response = await fetch('https://bitecount-backend.onrender.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ image }),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setError('Session expired. Please log in again.');
        setTimeout(() => navigate('/login'), 2000);
        setLoading(false);
        return;
      }

      if (response.ok) {
        if (data.message) {
          setNutritionData(data.message);
          setSuccess(true);
        } else {
          setError('No nutrition data received from server');
        }
      } else {
        setError(data.message || `Server error: ${response.status}`);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const parseNutritionData = (data) => {
    if (!data) return null;

    const lines = data.split('\n').filter(line => line.trim() !== '');
    return lines.map(line => {
      let cleanLine = line.trim();
      cleanLine = cleanLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      if (cleanLine.startsWith('#')) {
        const headerLevel = cleanLine.match(/^#+/)[0].length;
        const headerText = cleanLine.replace(/^#+\s*/, '');
        return {
          type: 'header',
          level: headerLevel,
          content: headerText,
          original: line,
        };
      }

      const lowerLine = cleanLine.toLowerCase();
      let category = 'normal';
      if (lowerLine.includes('calorie') || lowerLine.includes('kcal')) category = 'calories';
      else if (lowerLine.includes('protein')) category = 'protein';
      else if (lowerLine.includes('carb') || lowerLine.includes('carbohydrate')) category = 'carbs';
      else if (lowerLine.includes('fat') || lowerLine.includes('lipid')) category = 'fat';
      else if (lowerLine.includes('fiber') || lowerLine.includes('fibre')) category = 'fiber';
      else if (lowerLine.includes('sugar')) category = 'sugar';
      else if (lowerLine.includes('sodium') || lowerLine.includes('salt')) category = 'sodium';
      else if (lowerLine.includes('vitamin') || lowerLine.includes('mineral')) category = 'vitamin';

      return {
        type: 'text',
        category: category,
        content: cleanLine,
        original: line,
      };
    });
  };

  const renderNutritionItem = (item, index) => {
    if (item.type === 'header') {
      const HeaderTag = `h${Math.min(item.level + 2, 6)}`;
      return (
        <div key={index} className="mb-4">
          <HeaderTag className="text-xl font-bold text-white border-b border-slate-600 pb-2">
            {item.content}
          </HeaderTag>
        </div>
      );
    }

    const categoryStyles = {
      calories: 'bg-red-900/30 border-red-500/30 text-red-200',
      protein: 'bg-blue-900/30 border-blue-500/30 text-blue-200',
      carbs: 'bg-yellow-900/30 border-yellow-500/30 text-yellow-200',
      fat: 'bg-purple-900/30 border-purple-500/30 text-purple-200',
      fiber: 'bg-green-900/30 border-green-500/30 text-green-200',
      sugar: 'bg-orange-900/30 border-orange-500/30 text-orange-200',
      sodium: 'bg-pink-900/30 border-pink-500/30 text-pink-200',
      vitamin: 'bg-teal-900/30 border-teal-500/30 text-teal-200',
      normal: 'bg-slate-700/30 border-slate-500/30 text-gray-300',
    };

    const style = categoryStyles[item.category] || categoryStyles.normal;

    return (
      <div key={index} className={`border rounded-lg p-3 mb-2 ${style}`}>
        <p className="font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content }} />
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-white">Calorie</span>
              <span className="text-red-400"> Counter</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Snap a photo of your meal and get instant detailed nutritional analysis powered by AI
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-slate-800 border-2 border-dashed border-slate-600 rounded-2xl overflow-hidden hover:border-red-500/50 transition-colors duration-300">
                {isCamera ? (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      className="w-full h-64 object-cover bg-slate-900"
                      playsInline
                      muted
                      autoPlay
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-4 left-4 bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
                      <div className="absolute top-4 left-10 bg-slate-900/80 backdrop-blur-sm rounded px-2 py-1">
                        <span className="text-white text-xs font-medium">LIVE</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                      <button
                        onClick={capturePhoto}
                        className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ring-4 ring-white/20"
                      >
                        <Camera className="h-8 w-8 text-white" />
                      </button>
                      <button
                        onClick={stopCamera}
                        className="w-12 h-12 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                      >
                        <XCircle className="h-6 w-6 text-white" />
                      </button>
                    </div>
                    {loading && (
                      <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center">
                        <div className="text-center">
                          <Loader2 className="h-8 w-8 text-red-400 animate-spin mx-auto mb-2" />
                          <p className="text-white text-sm">Starting camera...</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Food preview" className="w-full h-64 object-cover" />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={handleRetakePhoto}
                        className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                        title="Retake Photo"
                      >
                        <RotateCcw className="h-5 w-5 text-white" />
                      </button>
                      <button
                        onClick={handleDeletePhoto}
                        className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                        title="Delete Photo"
                      >
                        <Trash2 className="h-5 w-5 text-white" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2">
                      <p className="text-white text-sm font-medium">Ready to analyze</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center space-y-6">
                    <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="h-12 w-12 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">Capture Your Meal</h3>
                      <p className="text-gray-400">Take a photo with your camera or upload an image</p>
                    </div>
                  </div>
                )}
              </div>

              {!imagePreview && !isCamera && (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={startCamera}
                    className="group bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3"
                  >
                    <Camera className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    <span>Open Camera</span>
                  </button>
                  <button
                    onClick={handleUploadClick}
                    className="group bg-slate-700 hover:bg-slate-600 text-white px-6 py-4 rounded-xl font-semibold border-2 border-slate-600 hover:border-red-500 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3"
                  >
                    <Upload className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    <span>Upload Image</span>
                  </button>
                </div>
              )}

              {isCamera && !loading && (
                <div className="bg-blue-900/50 border border-blue-500/50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 text-blue-200">
                    <Info className="h-5 w-5" />
                    <p className="text-sm">
                      <strong>Camera Tips:</strong> Position your food in good lighting. Tap the large red button to capture the photo.
                    </p>
                  </div>
                </div>
              )}

              {imagePreview && (
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={handleRetakePhoto}
                    className="group bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <RotateCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Retake</span>
                  </button>
                  <button
                    onClick={handleUploadClick}
                    className="group bg-slate-600 hover:bg-slate-500 text-white px-4 py-3 rounded-lg font-medium border border-slate-500 hover:border-slate-400 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Upload className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Upload</span>
                  </button>
                  <button
                    onClick={handleDeletePhoto}
                    className="group bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-4 py-3 rounded-lg font-medium border border-red-500/50 hover:border-red-500 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Delete</span>
                  </button>
                </div>
              )}

              {imagePreview && (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-6 w-6" />
                      <span>Analyze Nutrition</span>
                    </>
                  )}
                </button>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="space-y-6">
              {error && (
                <div className="bg-red-900/50 border border-red-500/50 rounded-xl p-4 flex items-center space-x-3">
                  <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                  <p className="text-red-200">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-900/50 border border-green-500/50 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <p className="text-green-200">Analysis completed successfully!</p>
                </div>
              )}

              {loading && (
                <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8">
                  <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-12 w-12 text-red-400 animate-spin" />
                    <h3 className="text-xl font-semibold text-white">Analyzing Your Meal</h3>
                    <p className="text-gray-400 text-center">Our AI is examining the nutritional content...</p>
                  </div>
                </div>
              )}

              {nutritionData && !loading && (
                <div className="bg-slate-800 border border-slate-600 rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
                    <div className="flex items-center space-x-3">
                      <Info className="h-6 w-6 text-white" />
                      <h3 className="text-2xl font-bold text-white">Nutritional Analysis</h3>
                    </div>
                  </div>
                  <div className="p-6 max-h-96 overflow-y-auto custom-scrollbar">
                    <div className="prose prose-invert max-w-none">
                      {parseNutritionData(nutritionData)?.map((item, index) => renderNutritionItem(item, index))}
                    </div>
                  </div>
                </div>
              )}

              {!nutritionData && !loading && !error && (
                <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Ready to Analyze</h3>
                  <p className="text-gray-400">
                    Upload an image of your food to get detailed nutritional information including calories,
                    proteins, carbs, fats, fiber, and more.
                  </p>
                </div>
              )}
            </div>
          </div>

          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgb(51, 65, 85);
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, rgb(220, 38, 38), rgb(185, 28, 28));
              border-radius: 4px;
              border: 1px solid rgb(71, 85, 105);
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, rgb(239, 68, 68), rgb(220, 38, 38));
            }
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: rgb(220, 38, 38) rgb(51, 65, 85);
            }
          `}</style>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">AI-Powered Analysis</h4>
              <p className="text-gray-400 text-sm">Advanced AI recognizes your food and provides accurate nutritional data</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Instant Capture</h4>
              <p className="text-gray-400 text-sm">Take photos directly or upload existing images for quick analysis</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Info className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Detailed Insights</h4>
              <p className="text-gray-400 text-sm">Get comprehensive breakdown of calories, macros, and micronutrients</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CalorieCounter;