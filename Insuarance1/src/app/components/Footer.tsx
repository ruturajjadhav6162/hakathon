'use client';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-0 pt-10 dark:bg-gray-800 dark:text-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Footer Column 1: Company Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul>
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Footer Column 2: Help */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Help</h3>
            <ul>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
            </ul>
          </div>

          {/* Footer Column 3: Follow Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <ul>
              <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
            </ul>
          </div>

          {/* Footer Column 4: Newsletter Signup */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter to get the latest updates and offers.</p>
            <form action="#" method="POST">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="p-2 w-full bg-gray-800 text-white rounded-md border border-gray-700 mb-4"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-800 text-center py-4 mt-12 dark:bg-gray-700">
        <p className="text-sm text-gray-400">&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
