import logo from "../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="pt-40 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-6 py-10">
      <div className="flex flex-row justify-between max-w-7xl mx-auto">
        {/* Logo + Description */}
        <div className="mb-10">
          <img className="h-20" src={logo} />
          <p className="text-m">
            The easiest solution to getting text and video testimonials from
            your customers.
          </p>
        </div>

        {/* Products */}
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Products
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">Our Wall of Love</a>
              </li>
              <li>
                <a href="#">Embed widgets</a>
              </li>
              <li>
                <a href="#">Chrome extension</a>
              </li>
              <li>
                <a href="#">Slack app</a>
              </li>
              <li>
                <a href="#">Hopin app</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">AI features</a>
              </li>
              <li>
                <a href="#">Integrations</a>
              </li>
              <li>
                <a href="#">Product demo</a>
              </li>
              <li>
                <a href="#">Status page</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">Help center</a>
              </li>
              <li>
                <a href="#">Our blog</a>
              </li>
              <li>
                <a href="#">Tutorials</a>
              </li>
              <li>
                <a href="#">Customer stories</a>
              </li>
              <li>
                <a href="#">Join affiliate program</a>
              </li>
              <li>
                <a href="#">Free tools</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Cookie policy</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
            </ul>
          </div>

          {/* Customers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Customers
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">Agencies</a>
              </li>
              <li>
                <a href="#">B2B companies</a>
              </li>
              <li>
                <a href="#">Course creators</a>
              </li>
              <li>
                <a href="#">eCommerce</a>
              </li>
              <li>
                <a href="#">Consumer apps</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Optional footer bottom */}
      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
}
