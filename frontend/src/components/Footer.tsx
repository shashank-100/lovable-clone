export function Footer() {
  return (
    <footer className="relative z-10 pb-8 pt-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMgMkwzIDEzTDEyIDEzTDExIDIyTDIxIDExTDEyIDExTDEzIDJaIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBmaWxsPSIjRkZGRkZGIiAvPjwvc3ZnPg=="
                alt="Bolt Logo"
                className="w-6 h-6"
              />
            </div>
            <span className="text-lg font-bold text-white">bolt</span>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700/30">
          <p className="text-gray-500 text-sm">
            © 2025 StackBlitz - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}