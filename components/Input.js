import React, { useRef, useState } from 'react'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { db, storage } from "../firebase";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

function Input() {
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const filePickerRef = useRef();
    const [loading, setLoading] = useState(false);

    const handleFileSelected = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    }

    const post = async () => {
        if (loading) {
            return;
        }

        setLoading(true);

        const docRef = await addDoc(collection(db, 'posts'), {
            text: input,
            timestamp: serverTimestamp()
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadURL,
                });
            });
        }

        setLoading(false);
        setSelectedFile(null);
        setInput("");
    }

    return (
        <div className={`border-b border-gray-200 w-full p-3 flex flex-col gap-5 ${loading && " opacity-60"}`}>
            <textarea
                disabled={loading}
                className=' min-h-[50px] w-full bg-transparent outline-none placeholder:text-gray-300 tracking-wide'
                rows={2}
                placeholder="What's happening?"
                onChange={(e) => setInput(e.target.value)}
                value={input}>
            </textarea>
            {selectedFile && (
                <div className=' relative'>
                    {
                        !loading && (
                            <div
                                onClick={() => setSelectedFile(null)}
                                className=' absolute left-3 top-3 cursor-pointer hover:bg-gray-700 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center'>
                                <XMarkIcon className='h-5 text-white' />
                            </div>
                        )
                    }
                    <img
                        src={selectedFile}
                        alt="Selected File"
                        className=' object-contain rounded-lg max-h-80'
                    />
                </div>
            )}
            {
                !loading && (
                    <div className=' border-t border-1 border-gray-200 pt-3 flex flex-row justify-between items-center'>
                        <div onClick={() => filePickerRef.current.click()}>
                            <PhotoIcon className='h-5 text-gray-500 cursor-pointer' />
                            <input
                                onChange={handleFileSelected}
                                hidden
                                type="file"
                                ref={filePickerRef}
                            />
                        </div>
                        <button
                            onClick={post}
                            disabled={!input.trim()}
                            className=' disabled:bg-gray-300 hover:bg-blue-600 bg-blue-500 text-white rounded-full px-5 py-2'>
                            Post
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default Input