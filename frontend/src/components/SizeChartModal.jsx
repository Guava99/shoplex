import React, { useState } from 'react'
import { LucideX, LucideRuler, LucideCheck } from 'lucide-react'

const sizeData = [
  { size: 'S', chestIn: '36-38', chestCm: '91-96', shoulderIn: '17.0', shoulderCm: '43.2', lengthIn: '27.5', lengthCm: '69.8', sleeveIn: '8.0', sleeveCm: '20.3' },
  { size: 'M', chestIn: '38-40', chestCm: '96-101', shoulderIn: '17.5', shoulderCm: '44.5', lengthIn: '28.0', lengthCm: '71.1', sleeveIn: '8.5', sleeveCm: '21.6' },
  { size: 'L', chestIn: '40-42', chestCm: '101-106', shoulderIn: '18.0', shoulderCm: '45.7', lengthIn: '28.5', lengthCm: '72.4', sleeveIn: '9.0', sleeveCm: '22.8' },
  { size: 'XL', chestIn: '42-44', chestCm: '106-111', shoulderIn: '18.5', shoulderCm: '47.0', lengthIn: '29.0', lengthCm: '73.6', sleeveIn: '9.5', sleeveCm: '24.1' },
  { size: 'XXL', chestIn: '44-46', chestCm: '111-116', shoulderIn: '19.0', shoulderCm: '48.2', lengthIn: '29.5', lengthCm: '74.9', sleeveIn: '10.0', sleeveCm: '25.4' },
]

const SizeChartModal = ({ isOpen, onClose, category = 'Men' }) => {
  const [unit, setUnit] = useState('in') // 'in' or 'cm'

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in'>
      <div className='bg-[var(--surface)] border border-[var(--border)] rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl animate-fade-in-up overflow-hidden max-h-[90vh] flex flex-col'>
        
        {/* Header */}
        <div className='flex items-center justify-between pb-4 border-b border-[var(--border)]'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center'>
              <LucideRuler size={20} />
            </div>
            <div>
              <h3 className='text-xl font-bold text-[var(--ink)]'>Garment Size Guide</h3>
              <p className='text-xs text-[var(--ink-soft)]'>Standard measurements for {category} apparel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='w-9 h-9 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)] hover:border-[var(--ink-muted)] transition-colors'
          >
            <LucideX size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className='overflow-y-auto py-6 space-y-6 flex-1 pr-1'>
          
          {/* Unit Toggle & Helper text */}
          <div className='flex items-center justify-between bg-[var(--surface-elevated)] p-3 rounded-xl border border-[var(--border)]'>
            <span className='text-xs font-semibold text-[var(--ink-soft)]'>Measurement Unit:</span>
            <div className='flex bg-[var(--surface)] border border-[var(--border)] p-1 rounded-lg gap-1'>
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  unit === 'in' ? 'bg-[var(--ink)] text-white shadow-xs' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  unit === 'cm' ? 'bg-[var(--ink)] text-white shadow-xs' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Measurements Table */}
          <div className='overflow-x-auto border border-[var(--border)] rounded-xl bg-[var(--surface)]'>
            <table className='w-full text-left text-xs sm:text-sm'>
              <thead>
                <tr className='bg-[var(--surface-elevated)] border-b border-[var(--border)] text-[var(--ink)] font-bold uppercase tracking-wider text-[11px]'>
                  <th className='py-3.5 px-4'>Size</th>
                  <th className='py-3.5 px-4'>Chest</th>
                  <th className='py-3.5 px-4'>Shoulder</th>
                  <th className='py-3.5 px-4'>Length</th>
                  <th className='py-3.5 px-4'>Sleeve</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-[var(--border)] text-[var(--ink-soft)]'>
                {sizeData.map((row) => (
                  <tr key={row.size} className='hover:bg-[var(--accent-soft)]/20 transition-colors'>
                    <td className='py-3 px-4 font-extrabold text-[var(--ink)] bg-[var(--surface-elevated)]/50'>{row.size}</td>
                    <td className='py-3 px-4'>{unit === 'in' ? `${row.chestIn}"` : `${row.chestCm} cm`}</td>
                    <td className='py-3 px-4'>{unit === 'in' ? `${row.shoulderIn}"` : `${row.shoulderCm} cm`}</td>
                    <td className='py-3 px-4'>{unit === 'in' ? `${row.lengthIn}"` : `${row.lengthCm} cm`}</td>
                    <td className='py-3 px-4'>{unit === 'in' ? `${row.sleeveIn}"` : `${row.sleeveCm} cm`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure Tip Box */}
          <div className='bg-[var(--accent-soft)]/40 border border-[var(--accent)]/30 rounded-xl p-4 space-y-3'>
            <h4 className='text-xs font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5'>
              <LucideCheck size={14} /> How to Measure Yourself
            </h4>
            <div className='grid sm:grid-cols-2 gap-3 text-xs text-[var(--ink-soft)] leading-relaxed'>
              <div>
                <span className='font-bold text-[var(--ink)]'>Chest:</span> Measure around the fullest part of your chest, keeping tape horizontal.
              </div>
              <div>
                <span className='font-bold text-[var(--ink)]'>Shoulder:</span> Measure from the tip of one shoulder bone across your back to the other.
              </div>
              <div>
                <span className='font-bold text-[var(--ink)]'>Length:</span> Measure from the highest point of the shoulder down to the bottom hem.
              </div>
              <div>
                <span className='font-bold text-[var(--ink)]'>Fit Tip:</span> If you're between sizes, order the larger size for a relaxed fit.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='pt-4 border-t border-[var(--border)] flex justify-end'>
          <button onClick={onClose} className='btn-primary px-6 py-2.5 text-xs uppercase tracking-wider'>
            Got it, Close
          </button>
        </div>

      </div>
    </div>
  )
}

export default SizeChartModal
