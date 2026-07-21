import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { LucideEye, LucideShoppingCart, LucideZap } from 'lucide-react';

const SocialProof = ({ productId }) => {
    const { viewers, joinProductRoom, leaveProductRoom } = useContext(SocketContext);
    const viewerCount = viewers[productId] || 1;

    
    const [recentSales, setRecentSales] = useState(0);
    const [isLowStock, setIsLowStock] = useState(false);

    useEffect(() => {
        if (productId) {
            joinProductRoom(productId);

            
            setRecentSales(Math.floor(Math.random() * 5) + 2);
            setIsLowStock(Math.random() > 0.7);

            return () => leaveProductRoom(productId);
        }
    }, [productId]);

    return (
        <div className="flex flex-wrap gap-2.5 my-5 animate-fade-in-up">
            {/* Viewer Count Indicator */}
            <div className="flex items-center gap-2 bg-[var(--surface-elevated)] text-[var(--ink-soft)] px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-[var(--border)] transition-all hover:border-[var(--ink-muted)]">
                <LucideEye size={14} className="text-blue-500 animate-pulse" />
                <span>{viewerCount} {viewerCount === 1 ? 'person' : 'people'} active now</span>
            </div>

            {/* Recent Sales Indicator */}
            <div className="flex items-center gap-2 bg-[var(--surface-elevated)] text-[var(--ink-soft)] px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-[var(--border)] transition-all hover:border-[var(--ink-muted)]">
                <LucideShoppingCart size={14} className="text-emerald-500" />
                <span>Sold {recentSales} times recently</span>
            </div>

            {/* Low Stock Indicator */}
            {isLowStock && (
                <div className="flex items-center gap-2 bg-[var(--accent-soft)] text-[var(--accent)] px-3.5 py-1.5 rounded-lg text-xs font-bold border border-[var(--accent-muted)] animate-pulse">
                    <LucideZap size={14} fill="currentColor" />
                    <span>Selling fast — low stock</span>
                </div>
            )}
        </div>
    );
};

export default SocialProof;
