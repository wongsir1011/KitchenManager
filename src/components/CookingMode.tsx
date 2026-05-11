import { useState, useEffect } from 'react';
import { MultiLangText } from '../services/aiService';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { cn } from '../lib/utils';

interface CookingModeProps {
  recipeName: string;
  steps: MultiLangText[];
  tips?: MultiLangText;
  displayLang: 'zh' | 'en' | 'id';
  onClose: () => void;
}

export default function CookingMode({ recipeName, steps, tips, displayLang, onClose }: CookingModeProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let wakeLock: any = null;
    
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await (navigator as any).wakeLock.request('screen');
        }
      } catch (err: any) {
        console.warn('Wake Lock error:', err);
      }
    };
    
    requestWakeLock();
    
    const handleVisChange = () => {
      if (wakeLock !== null && document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisChange);
    
    return () => {
      if (wakeLock) {
        wakeLock.release().catch(console.warn);
      }
      document.removeEventListener('visibilitychange', handleVisChange);
    };
  }, []);

  const getText = (multiLang?: MultiLangText) => {
    if (!multiLang) return '';
    if (displayLang === 'zh') return multiLang.zh;
    if (displayLang === 'id') return multiLang.id || multiLang.en || multiLang.zh;
    return multiLang.en || multiLang.zh;
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(s => s + 1);
  };
  
  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 text-white flex flex-col sm:p-4 pt-12 pb-8 px-4 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 sm:mt-4 max-w-4xl mx-auto w-full">
        <div>
          <h2 className="text-sm text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> 
            防休眠煮飯模式 (Cooking Mode)
          </h2>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1 text-orange-400">{recipeName}</h1>
        </div>
        <button 
          onClick={onClose}
          className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full relative">
        <div className="bg-gray-800 rounded-3xl p-8 sm:p-16 h-full sm:h-auto flex flex-col justify-center border border-gray-700 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
             <div 
               className="h-full bg-orange-500 transition-all duration-300"
               style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
             />
          </div>

          <div className="text-orange-500 font-mono text-xl mb-4 font-bold tracking-widest">STEP {currentStep + 1} OF {steps.length}</div>
          <p className="text-3xl sm:text-5xl leading-snug sm:leading-tight font-medium text-gray-100">
            {getText(steps[currentStep])}
          </p>

          {(currentStep === steps.length - 1 && tips) && (
             <div className="mt-12 bg-orange-900/40 border border-orange-500/30 p-6 rounded-2xl text-orange-200 text-lg sm:text-xl">
               <strong>Tips:</strong> {getText(tips)}
             </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between sm:justify-center sm:gap-12 max-w-4xl mx-auto w-full mt-8">
        <button 
          onClick={prevStep}
          disabled={currentStep === 0}
          className={cn(
            "p-6 sm:p-8 rounded-full flex items-center justify-center transition",
            currentStep === 0 ? "bg-gray-800 opacity-50 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700 text-white shadow-lg"
          )}
        >
          <ChevronLeft size={32} />
        </button>

        <div className="text-gray-400 font-medium tracking-widest text-lg">
          {currentStep + 1} / {steps.length}
        </div>

        <button 
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className={cn(
            "p-6 sm:p-8 rounded-full flex items-center justify-center transition",
            currentStep === steps.length - 1 ? "bg-gray-800 opacity-50 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/50"
          )}
        >
          <ChevronRight size={32} />
        </button>
      </div>

    </div>
  );
}
