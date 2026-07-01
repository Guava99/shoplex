import React, { useState, useEffect, useRef, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const { products, showSearch, setShowSearch, setSearch, currency, formatPrice } = useContext(ShopContext);
  const navigate = useNavigate();

  // Auto-focus the input when search overlay opens
  useEffect(() => {
    if (showSearch && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 150);
    }
    if (!showSearch) {
      setQuery('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [showSearch]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setShowSearch(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [setShowSearch]);

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = products
        .filter((product) => {
          const searchTerm = query.toLowerCase();
          return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.subCategory.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
          );
        })
        .slice(0, 6);
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, products]);

  const handleSearch = () => {
    if (query.trim()) {
      setSearch(query);
      setShowSearch(false);
      navigate('/collection');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        navigateToProduct(suggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setShowSearch(false);
    }
  };

  const navigateToProduct = (product) => {
    navigate(`/product/${product._id}`);
    setQuery('');
    setShowSuggestions(false);
    setSelectedIndex(-1);
    setShowSearch(false);
  };

  const highlightMatch = (text, query) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className='bg-[var(--accent-soft)] text-[var(--accent)] font-semibold px-0.5 rounded'>{part}</span>
      ) : (
        part
      )
    );
  };

  if (!showSearch) return null;

  return (
    <>
      {/* Full-screen backdrop */}
      <div 
        className='fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] animate-fade-in-up'
        onClick={() => setShowSearch(false)}
      />

      {/* Search Panel — centered overlay */}
      <div className='fixed top-0 left-0 right-0 z-[201] flex justify-center pt-[10vh] px-4'>
        <div ref={searchRef} className='w-full max-w-2xl animate-fade-in-up'>
          {/* Search Input */}
          <div className='relative'>
            <div className='absolute left-5 top-1/2 transform -translate-y-1/2 text-[var(--ink-muted)]'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </div>
            <input
              ref={inputRef}
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => query.length > 1 && setShowSuggestions(true)}
              placeholder='Search for products, brands, categories...'
              className='w-full pl-14 pr-14 py-5 rounded-2xl border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-all bg-[var(--surface)] text-[var(--ink)] shadow-2xl text-base'
            />
            {/* Close / Clear */}
            <button
              onClick={() => {
                if (query) {
                  setQuery('');
                  setSuggestions([]);
                  setShowSuggestions(false);
                } else {
                  setShowSearch(false);
                }
              }}
              className='absolute right-5 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          {/* Keyboard shortcut hint */}
          {!query && (
            <p className='text-center text-xs text-[var(--ink-muted)] mt-3 opacity-70'>
              Press <kbd className='px-1.5 py-0.5 bg-[var(--surface-elevated)] border border-[var(--border)] rounded text-[10px] font-mono'>ESC</kbd> to close
            </p>
          )}

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className='mt-3 bg-[var(--surface)] rounded-xl shadow-2xl border border-[var(--border)] overflow-hidden'>
              <div className='p-2'>
                {suggestions.map((product, index) => (
                  <button
                    key={product._id}
                    onClick={() => navigateToProduct(product)}
                    className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all ${
                      index === selectedIndex ? 'bg-[var(--surface-elevated)]' : 'hover:bg-[var(--surface-elevated)]'
                    }`}
                  >
                    <div className='w-12 h-12 flex-shrink-0'>
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className='w-full h-full object-cover rounded-md'
                      />
                    </div>
                    <div className='flex-1 text-left'>
                      <div className='font-semibold text-[var(--ink)] text-sm line-clamp-1'>
                        {highlightMatch(product.name, query)}
                      </div>
                      <div className='text-xs text-[var(--ink-muted)] mt-0.5'>
                        {product.category} • {product.subCategory}
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='font-bold text-[var(--accent)]'>{currency}{formatPrice(product.price)}</div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className='border-t border-[var(--border)] p-3 bg-[var(--surface-elevated)]'>
                <button
                  onClick={handleSearch}
                  className='w-full text-center text-sm text-[var(--ink)] hover:text-[var(--accent)] font-semibold flex items-center justify-center gap-2 py-1.5 transition-colors'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                  </svg>
                  View all results for "{query}"
                </button>
              </div>
            </div>
          )}

          {/* No Results */}
          {showSuggestions && query.length > 1 && suggestions.length === 0 && (
            <div className='mt-3 bg-[var(--surface)] rounded-xl shadow-2xl border border-[var(--border)] p-6 text-center'>
              <svg className='w-12 h-12 mx-auto text-[var(--ink-muted)] mb-3 opacity-60' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <p className='text-[var(--ink)] font-semibold'>No products found for "{query}"</p>
              <p className='text-sm text-[var(--ink-muted)] mt-1'>Try using different terms</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
