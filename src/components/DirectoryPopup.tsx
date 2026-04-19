import { useState } from "react";
import { X } from "lucide-react";

const DirectoryPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-card border border-border rounded-full px-4 py-2 text-sm font-medium hover:bg-accent transition-colors shadow-lg"
      >
        🗂 Product Directory
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-2xl font-bold mb-2">PresciaIQ Products</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Choose the intelligence layer that fits your business.
            </p>

            <div className="space-y-3">
              <a
                href="https://buildpredictiq.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-background border border-border rounded-xl hover:border-[#00ff88]/50 transition-colors group"
              >
                <div>
                  <div className="font-semibold text-sm">BuildPredictIQ</div>
                  <div className="text-xs text-muted-foreground">Construction Intelligence</div>
                </div>
                <span className="text-[#00ff88] text-sm group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <a
                href="https://adsiq.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-background border border-border rounded-xl hover:border-[#00ff88]/50 transition-colors group"
              >
                <div>
                  <div className="font-semibold text-sm">AdsIQ</div>
                  <div className="text-xs text-muted-foreground">Marketing Intelligence</div>
                </div>
                <span className="text-[#00ff88] text-sm group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <a
                href="https://opsiq.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-background border border-border rounded-xl hover:border-[#00ff88]/50 transition-colors group"
              >
                <div>
                  <div className="font-semibold text-sm">OpsIQ</div>
                  <div className="text-xs text-muted-foreground">Operations Intelligence</div>
                </div>
                <span className="text-[#00ff88] text-sm group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <a
                href="https://tradesmaniq.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-background border border-border rounded-xl hover:border-[#00ff88]/50 transition-colors group"
              >
                <div>
                  <div className="font-semibold text-sm">TradesmanIQ</div>
                  <div className="text-xs text-muted-foreground">Trades Intelligence</div>
                </div>
                <span className="text-[#00ff88] text-sm group-hover:translate-x-1 transition-transform">→</span>
              </a>

              <button
                onClick={( ) => { setIsOpen(false); navigate("/development"); }}
                className="flex items-center justify-between w-full p-4 bg-background border border-border rounded-xl hover:border-[#00ff88]/50 transition-colors group text-left"
              >
                <div>
                  <div className="font-semibold text-sm">Web & App Development</div>
                  <div className="text-xs text-muted-foreground">Custom builds for Australian businesses</div>
                </div>
                <span className="text-[#00ff88] text-sm group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DirectoryPopup;
