import { KalaKritiLogo } from './KalaKritiLogo';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-amber-900/20 to-orange-900/20 flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        {/* Animated Logo */}
        <div className="animate-pulse">
          <KalaKritiLogo size="lg" />
        </div>
        
        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <p className="text-white font-medium">Loading KalaKriti</p>
          <p className="text-amber-200 text-sm">Connecting artisans with the world...</p>
        </div>
      </div>
    </div>
  );
}