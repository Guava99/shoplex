import React, { useState } from 'react'

const FitFinder = ({ isOpen, onClose, onSelectSize, availableSizes = [] }) => {
  const [height, setHeight] = useState('')
  const [heightUnit, setHeightUnit] = useState('cm')
  const [weight, setWeight] = useState('')
  const [weightUnit, setWeightUnit] = useState('kg')
  const [fitPreference, setFitPreference] = useState('regular')
  const [recommendation, setRecommendation] = useState('')

  if (!isOpen) return null;

  const calculateSize = (e) => {
    e.preventDefault();
    if (!height || !weight) return;

    let h = parseFloat(height);
    let w = parseFloat(weight);

    // Normalize to cm and kg
    if (heightUnit === 'in') h = h * 2.54;
    if (weightUnit === 'lbs') w = w * 0.453592;

    let size = 'M';

    if (w < 58) {
      size = 'S';
    } else if (w >= 58 && w < 72) {
      size = 'M';
    } else if (w >= 72 && w < 86) {
      size = 'L';
    } else if (w >= 86 && w < 98) {
      size = 'XL';
    } else {
      size = 'XXL';
    }

    // Adjust size based on fit preference
    const sizesArr = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    let idx = sizesArr.indexOf(size);

    if (fitPreference === 'slim' && idx > 0) {
      idx--;
    } else if (fitPreference === 'loose' && idx < sizesArr.length - 1) {
      idx++;
    }

    const recommended = sizesArr[idx];
    
    // Check if the recommended size is available in product sizes
    if (availableSizes.length > 0 && !availableSizes.includes(recommended)) {
      // Find the closest available size
      const availableIndices = availableSizes.map(s => sizesArr.indexOf(s)).filter(i => i !== -1);
      if (availableIndices.length > 0) {
        const closestIdx = availableIndices.reduce((prev, curr) => 
          Math.abs(curr - idx) < Math.abs(prev - idx) ? curr : prev
        );
        setRecommendation(sizesArr[closestIdx]);
      } else {
        setRecommendation(availableSizes[0]);
      }
    } else {
      setRecommendation(recommended);
    }
  }

  return (
    <div className='fixed inset-0 z-[110] flex items-center justify-center p-4 page-transition'>
      {/* Backdrop */}
      <div 
        className='absolute inset-0 bg-black/50 backdrop-blur-xs' 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className='relative w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xl p-6 sm:p-8 z-10'>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className='absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--surface-elevated)] border border-[var(--border)] transition-colors'
        >
          <svg className='w-4.5 h-4.5 text-[var(--ink-soft)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>

        {/* Title */}
        <div className='mb-6'>
          <h3 className='font-heading text-lg font-bold text-[var(--ink)] uppercase tracking-wider flex items-center gap-2'>
            📏 Find Your Fit
          </h3>
          <p className='text-xs text-[var(--ink-muted)] mt-0.5'>Get a sizing recommendation based on your details</p>
        </div>

        {/* Calculator Form */}
        {!recommendation ? (
          <form onSubmit={calculateSize} className='space-y-4'>
            {/* Height input */}
            <div className='space-y-1.5'>
              <label className='block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]'>Your Height</label>
              <div className='flex gap-2'>
                <input
                  type="number"
                  required
                  min={50}
                  max={300}
                  className='input-field flex-1'
                  placeholder={heightUnit === 'cm' ? 'e.g. 175' : 'e.g. 68'}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
                <select
                  className='px-3 border border-[var(--border)] rounded-lg bg-[var(--surface-elevated)] text-[var(--ink)] text-xs focus:outline-none'
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value)}
                >
                  <option value="cm">cm</option>
                  <option value="in">inches</option>
                </select>
              </div>
            </div>

            {/* Weight input */}
            <div className='space-y-1.5'>
              <label className='block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]'>Your Weight</label>
              <div className='flex gap-2'>
                <input
                  type="number"
                  required
                  min={10}
                  max={500}
                  className='input-field flex-1'
                  placeholder={weightUnit === 'kg' ? 'e.g. 70' : 'e.g. 154'}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <select
                  className='px-3 border border-[var(--border)] rounded-lg bg-[var(--surface-elevated)] text-[var(--ink)] text-xs focus:outline-none'
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value)}
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>

            {/* Fit Preference */}
            <div className='space-y-1.5'>
              <label className='block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]'>Preferred Fit</label>
              <div className='grid grid-cols-3 gap-2'>
                {['slim', 'regular', 'loose'].map((fit) => (
                  <button
                    key={fit}
                    type='button'
                    onClick={() => setFitPreference(fit)}
                    className={`py-2 text-xs font-bold capitalize rounded-lg border transition-all ${
                      fitPreference === fit
                        ? 'bg-[var(--ink)] border-[var(--ink)] text-white'
                        : 'border-[var(--border)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    {fit} Fit
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <button type='submit' className='btn-primary w-full py-3.5 mt-4 text-xs font-bold uppercase tracking-wider'>
              Calculate Recommendation
            </button>
          </form>
        ) : (
          /* Results view */
          <div className='space-y-6 text-center py-4 animate-fade-in-up'>
            <div className='w-20 h-20 bg-[var(--accent-soft)] text-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--accent-muted)]'>
              <span className='text-3xl font-extrabold font-heading'>{recommendation}</span>
            </div>
            
            <div>
              <h4 className='font-bold text-lg text-[var(--ink)]'>Recommended Size: {recommendation}</h4>
              <p className='text-xs text-[var(--ink-soft)] mt-2 leading-relaxed max-w-xs mx-auto'>
                Based on your height of {height} {heightUnit}, weight of {weight} {weightUnit}, and a {fitPreference} fit preference.
              </p>
            </div>

            <div className='grid grid-cols-2 gap-3 pt-4'>
              <button
                onClick={() => {
                  setRecommendation('');
                  setHeight('');
                  setWeight('');
                }}
                className='btn-secondary py-3 text-xs font-bold uppercase tracking-wider'
              >
                Recalculate
              </button>
              <button
                onClick={() => {
                  onSelectSize(recommendation);
                  onClose();
                }}
                className='btn-primary py-3 text-xs font-bold uppercase tracking-wider'
              >
                Apply Size
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FitFinder
