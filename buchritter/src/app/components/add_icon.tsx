"use client"

import { Plus } from 'lucide-react';

export default function FloatingAddIcon({ onClick }: { onClick: () => void }) {
    return(
        <button 
            onClick={() => onClick()}
            className="fixed bottom-6 right-6 z-50 p-4 bg-blue-700 rounded-full 
            shadow-lg hover:bg-blue-900 transition">
            <Plus />
        </button>
    );
}