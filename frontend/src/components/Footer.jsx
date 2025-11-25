import { PiHeartStraightBold } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 z-10 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} TinyLink. All rights reserved. 
        </p>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
          Built with <PiHeartStraightBold className="inline w-4 h-4 mx-1 text-red-400" /> by <a href="https://sridiptah99.netlify.app" target="_blank" rel="noopener noreferrer">Sridip Tah</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer