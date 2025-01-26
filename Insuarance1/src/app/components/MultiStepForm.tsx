'use client';
import { useState } from 'react';

interface FormData {
  carNumber: string;
  ownerName: string;
  insuranceNumber: string;
}

interface MultiStepFormProps {
  onBackClick: () => void;
  onFormSubmit: (data: FormData) => void;
  uploadedImage: string; // Add this prop for the uploaded image URL
}

const MultiStepForm = ({ onBackClick, onFormSubmit, uploadedImage }: MultiStepFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    carNumber: '',
    ownerName: '',
    insuranceNumber: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);  // Call the parent component's onFormSubmit function with the form data
    setIsSubmitted(true); // Mark as submitted to display the success message and the Done button
  };

  const handleDoneClick = () => {
    // Only redirect when the Done button is clicked
    window.location.href = 'http://localhost:3000'; // Redirect to localhost:3000 when "Done" button is clicked
  };

  return (
    <div className="multi-step-form bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
      {!isSubmitted ? (
        <>
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Enter Car Details
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black">Car Number</label>
              <input
                type="text"
                name="carNumber"
                value={formData.carNumber}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-black">Owner Name</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-black">Insurance Number</label>
              <input
                type="text"
                name="insuranceNumber"
                value={formData.insuranceNumber}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-black"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-blue-600 text-white mb-4"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={onBackClick}
              className="w-full py-2 rounded-lg bg-gray-300 text-gray-600"
            >
              Back
            </button>
          </form>
        </>
      ) : (
        <>
          {/* Display the uploaded image and success message */}
          <div className="text-center bg-white">
            {uploadedImage && (
              <div className="uploaded-image mb-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded Car"
                  className="max-w-[200px] h-auto mx-auto rounded-lg border-2 border-gray-300"
                />
              </div>
            )}
            <p className="text-2xl font-semibold text-gray-800 mb-4">
              Form Submitted Successfully!
            </p>
            <button
              onClick={handleDoneClick}
              className="w-full py-2 rounded-lg bg-green-600 text-white"
            >
              Done
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MultiStepForm;
