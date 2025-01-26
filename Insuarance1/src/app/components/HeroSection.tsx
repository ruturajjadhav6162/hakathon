'use client';
import { useState } from 'react';
import MultiStepForm from './MultiStepForm';

const HeroSection = () => {
  const [image, setImage] = useState<File | null>(null);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showCarDetailsForm, setShowCarDetailsForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
  const [uploadedImageURL, setUploadedImageURL] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
      setUploadedImageURL(URL.createObjectURL(file)); // Store the image URL for display
      setIsNextEnabled(true);
    }
  };

  const handleNextClick = () => {
    if (image) {
      setShowForm(true);
      setShowCarDetailsForm(true);
    }
  };

  const handleBackClick = () => {
    setShowForm(false);
    setImage(null);
    setIsNextEnabled(false);
  };

  const handleFormSubmit = (data: { carNumber: string; ownerName: string; insuranceNumber: string }) => {
    console.log('Form Submitted with Data:', data);
    setFormSubmitted(true); // Set the form as submitted
    // Redirect after a delay without using Next.js router
    setTimeout(() => {
      window.location.href = 'http://localhost:3000'; // Redirect to localhost:3000
    }, 2000);
  };

  return (
    <div className="hero-section relative bg-cover bg-center py-12" style={{ backgroundImage: 'url(/car.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-sm"></div>
      <div className="relative z-10 text-center text-white">
        <div className="quote-section mb-8">
          <p className="text-4xl text-white font-semibold italic">Auto Secure</p>
        </div>

        {/* Show Image and Success Message after Form Submission */}
        {formSubmitted && uploadedImageURL && (
          <div className="success-message mb-6">
            <h3 className="text-2xl font-semibold text-green-500">Form Submitted Successfully</h3>
            <div className="uploaded-image mb-4 text-center">
              <img
                src={uploadedImageURL}
                alt="Uploaded Car"
                className="max-w-[200px] h-auto mx-auto rounded-lg border-2 border-gray-300"
              />
            </div>
            <p className="text-lg text-gray-100">Your form has been successfully submitted!</p>
            <p className="text-sm text-gray-500">Redirecting you shortly...</p>
          </div>
        )}

        {!showForm && !formSubmitted && (
          <div className="form-section bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">Upload Your Car's Image</h3>
            {image && (
              <div className="uploaded-image mb-4 text-center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded Car"
                  className="max-w-[200px] h-auto mx-auto rounded-lg border-2 border-gray-300"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input mb-4 p-2 border border-gray-300 rounded-lg w-full"
            />
            <button
              onClick={handleNextClick}
              disabled={!isNextEnabled}
              className={`next-button w-full py-2 rounded-lg ${isNextEnabled ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}
            >
              Next
            </button>
          </div>
        )}

        {showForm && showCarDetailsForm && !formSubmitted && (
          <MultiStepForm
            onBackClick={handleBackClick}
            onFormSubmit={handleFormSubmit}
            uploadedImage={uploadedImageURL || ''} // Pass the uploaded image URL to the MultiStepForm component
          />
        )}
      </div>
      <div className="why-choose-us mt-12 text-center z-10 relative">
        <h3 className="text-2xl font-semibold text-gray-100 mb-6">Why Choose Us?</h3>
        <div className="flex justify-around items-center">
          <div className="why-item flex flex-col items-center max-w-xs">
            <img src="/zero.webp" alt="Zero Paperwork" className="w-20 h-20 mb-4 bg-white rounded-full" />
            <p className="text-lg text-gray-100">Zero Paperwork</p>
          </div>
          <div className="why-item flex flex-col items-center max-w-xs">
            <img src="/support.png" alt="24/7 Claims Support" className="w-20 h-20 mb-4 bg-white rounded-full" />
            <p className="text-lg text-gray-100">24/7 Claims Support</p>
          </div>
          <div className="why-item flex flex-col items-center max-w-xs">
            <img src="/coverage.png" alt="Instant Coverage" className="w-20 h-20 mb-4 bg-white rounded-full" />
            <p className="text-lg text-gray-100">Instant Coverage</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
