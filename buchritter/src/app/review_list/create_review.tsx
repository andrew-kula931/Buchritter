"use client"

import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { Plus } from 'lucide-react';
import { FaRegStar } from "react-icons/fa";
import { useState } from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateReview() {
    const [isOpen, toggleModal] = useState(false);

    return(
        <div>
            <FloatingAddIcon 
                isOpen={isOpen} 
                onClose={() => toggleModal(true)}
            />
            <CreateModal 
                isOpen={isOpen}
                onClose={() => toggleModal(false)} 
            />
        </div>
    );
}

function CreateModal({ isOpen, onClose}: ModalProps) {
    if (!isOpen) return null;
    const [rating, setRating] = useState<number>(0);

    const ratingChange = (event: Event, newValue: number) => {
        setRating(newValue);
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="flex flex-col max-w-[900px] max-h-[500px] p-4 bg-gray-700">
                <p className="pb-2 text-xl">Create New Review</p>
                <div className="flex flex-row space-x-4">
                    <div className="flex flex-col">
                        <p>Title</p>
                        <TextField id='titleField' variant="outlined" multiline maxRows={2} size="small" />

                        <p className="pt-2">Summary</p>
                        <TextField id="summaryField" variant="outlined" multiline minRows={3} maxRows={6} size="small" />
                    </div>
                    <div className="w-[200px] h-[200px] bg-gray-800">Pic</div>
                </div>

                {/* Rating */}
                <div className="flex flex-row space-x-1 pt-4">
                    <p className="pt-[3px] pr-1">Rating:</p>
                    <p className="pt-[3px] w-[30px]">{rating.toString()}</p>
                    <FaRegStar className="pr-2" size={26} color="yellow" />
                    <Slider
                        value={rating}
                        onChange={ratingChange}
                        min={0}
                        max={5}
                        step={0.1}
                        valueLabelDisplay='auto'
                    />
                </div>

                {/* Tags */}
                <div className="flex flex-row space-x-1 pt-4">
                    <p>Tags:</p>
                </div>

                {/* Close and create buttons */}
                <div className="flex flex-row justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="mt-4 px-3 py-1 bg-gray-500 rounded hover:bg-gray-600">
                        Close
                    </button>
                    <button className="mt-4 px-3 py-1 bg-blue-500 rounded hover:bg-blue-600">
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

function FloatingAddIcon({ isOpen, onClose}: ModalProps) {
    return(
        <button 
            onClick={() => onClose()}
            className="fixed bottom-6 right-6 z-50 p-4 bg-blue-700 rounded-full 
            shadow-lg hover:bg-blue-900 transition">
            <Plus />
        </button>
    );
}