import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SpinnerLoader from './Loader/SpinnerLoader'
import { BackendURL } from '../config/ApiRoute'

const Notes = () => {

    const [topic, setTopic] = useState("")
    const [topicExplanation, setTopicExplanation] = useState("")
    const [notesList, setNotesList] = useState([]);
    const [isLoading, setIsLoading] = useState("");
    const [clickedIndex, setClickedIndex] = useState(null)

    const clearState = () => {
        setTopic("")
        setTopicExplanation("")
    }

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await axios.get(`${BackendURL}/notes`);
            setNotesList(response.data);
        };
        fetchNotes();
    }, [])

    const getNotes = async () => {
        const response = await axios.get(`${BackendURL}/notes`);
        console.log(response.data);
        setNotesList(response.data);
    }

    const handleSubmit = async () => {
        if (!topic || !topicExplanation) {
            alert("Topic and Explanation are required fields.");
            return;
        }
        const payload = {
            topic: topic,
            explanation: topicExplanation
        };
        setIsLoading("post")
        try {
            await axios.post(`${BackendURL}/notes`, payload);
            clearState();
            getNotes();
            setIsLoading("")
        } catch (error) {
            console.error("Error creating user:", error);
        } finally {
            setIsLoading("")
        }
    };


    const handleDelete = async (userId) => {
        setIsLoading("delete")
        try {
            await axios.delete(`${BackendURL}/notes/${userId}`);
            getNotes();
            setIsLoading("")
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            setIsLoading("")
        }
    }

    return (
        <div>
            <div className="w-full flex gap-4">

                <div className="w-[30%]">
                    <label className="block mb-1 text-sm text-gray-700 text-start">Topic Name</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-3 py-2 border border-purple-300 rounded mb-3 focus:ring-2 focus:ring-purple-400"
                        placeholder="enter topic name"
                    />
                    <div className="w-[60%] flex justify-start items-center">
                        {isLoading === "post" ?
                            <>
                                <SpinnerLoader />
                            </> :
                            <div
                                onClick={() => handleSubmit()}
                                className="w-full py-1 text-center bg-blue-500 text-white cursor-pointer hover:bg-blue-600 rounded-md border border-gray-800"
                            >
                                Submit
                            </div>
                        }
                    </div>
                </div>
                <div className="w-[70%]">
                    <label className="block mb-1 text-sm text-gray-700 text-start">Topic Explanation</label>
                    <textarea
                        rows={3}
                        value={topicExplanation}
                        onChange={(e) => setTopicExplanation(e.target.value)}
                        className="w-full px-3 py-2 border border-purple-300 rounded mb-4 focus:ring-2 focus:ring-purple-400"
                        placeholder="enter explanation"
                    />
                </div>

            </div>

            <div className="w-full border border-gray-300 rounded">

                {/* Header */}
                <div className="flex font-semibold bg-gray-100 border-b border-gray-300 text-sm sm:text-base">

                    <div className="w-12 sm:w-16 border-r border-gray-300 p-2">
                        #
                    </div>

                    <div className="flex-1 min-w-0 border-r border-gray-300 p-2 break-words">
                        Topic Name
                    </div>

                    <div className="flex-[2] min-w-0 border-r border-gray-300 p-2 break-words">
                        Topic Explanation
                    </div>

                    <div className="w-20 p-2">
                        Delete
                    </div>
                </div>

                {/* Scrollable Rows */}
                <div className="max-h-96 overflow-y-auto">
                    {[...notesList]?.reverse().map((note, index) => (
                        <div key={index} className="flex border-b border-gray-300 text-sm sm:text-base">

                            <div className="w-12 sm:w-16 border-r border-gray-300 p-2">
                                {index + 1}
                            </div>

                            <div className="flex-1 min-w-0 border-r border-gray-300 p-2 break-words">
                                {note.topic}
                            </div>

                            <div className="flex-[2] min-w-0 border-r border-gray-300 p-2 break-words">
                                {note.explanation || ""}
                            </div>

                            <div className="w-20 p-2">
                                {isLoading === "delete" && clickedIndex === index ? (
                                    <SpinnerLoader />
                                ) : (
                                    <div
                                        onClick={() => {
                                            handleDelete(note?.id);
                                            setClickedIndex(index);
                                        }}
                                        className="cursor-pointer text-red-600 hover:underline"
                                    >
                                        Delete
                                    </div>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Notes
