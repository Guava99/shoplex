import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { LucideGlobe, LucideChevronDown } from 'lucide-react';

const CurrencySwitcher = () => {
    const { currency, currencyCode, setCurrency, setCurrencyCode, currencySymbols } = useContext(ShopContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleCurrencyChange = (code) => {
        setCurrencyCode(code);
        setCurrency(currencySymbols[code]);
        setIsOpen(false);
    };

    return (
        <div className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-all group"
            >
                <LucideGlobe size={14} className="text-orange-600 group-hover:rotate-12 transition-transform" />
                <span className="text-xs font-bold text-amber-900 uppercase tracking-tighter">
                    {currencyCode} ({currency})
                </span>
                <LucideChevronDown size={14} className={`text-orange-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full mt-2 right-0 w-36 bg-white border border-orange-100 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="py-1">
                            {Object.entries(currencySymbols).map(([code, symbol]) => (
                                <button
                                    key={code}
                                    onClick={() => handleCurrencyChange(code)}
                                    className={`w-full flex items-center justify-between px-4 py-2 text-xs font-semibold transition-colors ${currencyCode === code
                                            ? 'bg-orange-500 text-white'
                                            : 'text-amber-900 hover:bg-orange-50'
                                        }`}
                                >
                                    <span>{code}</span>
                                    <span>{symbol}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CurrencySwitcher;
