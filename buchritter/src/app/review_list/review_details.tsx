"use client"

import { useState, useEffect } from 'react';
import { FaRegStar } from "react-icons/fa";
import { addReview, updateReview, Review, Configurations } from '@/server/api/review_req';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

type ModalProps = {
    isOpen: boolean;
    onClose: (update: boolean) => void;
    tagConfigs?: Configurations[];
    reviewRef?: Review;
}

export default function ReviewDetails({ isOpen, onClose, tagConfigs, reviewRef }: ModalProps) {
    const [title, setTitle] = useState<string>(reviewRef?.title ?? "");
    const [summary, setSummary] = useState<string>(reviewRef?.summary ?? "");
    const [rating, setRating] = useState<number>(reviewRef?.rating ?? 0);
    const [review, setReview] = useState<string>(reviewRef?.review ?? "");
    const [link, setLink] = useState<string>(reviewRef?.link ?? "");
    const [selected, setSelected] = useState<string[]>(reviewRef?.tags.map((t) => t.value) ?? []);
    const tags: string[] = (tagConfigs ?? []).map((t: Configurations) => t.value);

    useEffect(() => {
        if (reviewRef) {
            setTitle(reviewRef.title);
            setSummary(reviewRef.summary);
            setRating(reviewRef.rating);
            setReview(reviewRef.review);
            setLink(reviewRef.link ?? "");
            setSelected(tagConfigs?.filter((t) => reviewRef.tags.map((m) => m.id).includes(t.id)).map((t) => t.value) ?? []); 
        } else {
            setTitle("");
            setSummary("");
            setRating(0);
            setReview("");
            setLink("");
            setSelected([]); 
        } 
    }, [isOpen]);

    const ratingChange = (event: Event, newValue: number) => {
        setRating(newValue);
    }

    // Does not render unless prompted for
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="flex flex-col max-w-[900px] max-h-[700px] p-4 bg-gray-700">
                <p className="pb-2 text-xl">Create New Review</p>
                <hr className="p-2 border-t border-gray-500"></hr>
                <div className="flex flex-row space-x-4">
                    <div className="flex flex-col w-[100%]">
                        <p>Title</p>
                        <TextField id='titleField' value={title} variant="outlined" multiline maxRows={2} size="small"
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { color: 'white' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } }}/>

                        <p className="pt-2">Summary</p>
                        <TextField id="summaryField" value={summary} variant="outlined" multiline minRows={3} maxRows={6} size="small" 
                            onChange={(e) => setSummary(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { color: 'white' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } }}/>
                    </div>
                    <div className="w-[400px] h-[240px] bg-gray-800">Pic</div>
                </div>

                {/* Rating */}
                <div className="flex flex-row space-x-2 pt-4">
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
                <div className="flex flex-row space-x-2 pt-5">
                    <p className="pt-[3px]">Tags:</p>
                    <div className="space-x-1 space-y-1">
                        {tags.map((tag) => (
                            <button
                                key={tag} 
                                className={`px-4 py-1 rounded-md text-sm ${selected.includes(tag)
                                    ? "bg-blue-600 text-white"
                                    : 'bg-gray-400 text-gray-800 hover:bg-gray-300'
                                    }`}
                                onClick={() => {
                                    setSelected((prev) => 
                                        prev.includes(tag) 
                                            ? prev.filter((t) => t !== tag)
                                            : [...prev, tag]
                                    )
                                }}
                            >
                                {tag}
                            </button>
                    ))}

                    </div>
                </div>

                {/* Link */}
                <div className="flex flex-row items-center space-x-4 pt-4">
                    <p>Link:</p>
                    <TextField id='linkField' value={link} variant="outlined" size="small" className="w-full"
                        onChange={(e) => setLink(e.target.value)}
                        sx={{ '& .MuiInputBase-input': { color: 'white' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } }}/>
                </div>


                {/* Review */}
                <div className="flex flex-col pt-4">
                    <p>Review</p>
                    <TextField id='reviewField' value={review} variant="outlined" multiline minRows={4} maxRows={8} size="small" 
                        onChange={(e) => setReview(e.target.value)}
                        sx={{ '& .MuiInputBase-input': { color: 'white' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } }}/>
                </div>

                {/* Close and create buttons */}
                <div className="flex flex-row justify-end space-x-2">
                    <button
                        onClick={() => {
                            onClose(false);
                        }}
                        className="mt-4 px-3 py-1 bg-gray-500 rounded hover:bg-gray-600">
                        Close
                    </button>

                    {/* image_path and link currently unavailable */}
                    <button 
                        onClick={() => {
                            if (reviewRef) {
                                const updatingReview: Review = {
                                    title, summary, rating, review, image_path: undefined, link: link,
                                    tags: (tagConfigs ?? []).filter((t) => selected.includes(t.value)),
                                    id: reviewRef.id, created_at: new Date(),
                                }
                                updateReview(updatingReview);
                            } else {
                                const newReview: Review = {
                                    title, summary, rating, review, image_path: undefined, link: link,
                                    tags: (tagConfigs ?? []).filter((t) => selected.includes(t.value)),
                                    id: 0,
                                    created_at: new Date()
                                }
                                addReview(newReview);
                            }

                            onClose(true);
                        }} 
                        className="mt-4 px-3 py-1 bg-blue-500 rounded hover:bg-blue-600">
                        {reviewRef ? "Update": "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}