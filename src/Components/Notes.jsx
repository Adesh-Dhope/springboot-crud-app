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

            <div className="w-full border border-gray-300 rounded max-h-96 overflow-y-auto">

                <div className="sticky top-0 flex font-semibold bg-gray-100 border-b border-gray-300">
                    <div className="w-16 border-r border-gray-300 p-1">#</div>
                    <div className="w-72 border-r border-gray-300 p-1">Topic Name</div>
                    <div className="w-[750px] border-r border-gray-300 p-1">Topic Explanation</div>
                    <div className="w-20 p-1">Delete</div>
                </div>

                <div className="">
                    {[...notesList]?.reverse().map((note, index) => (
                        <div
                            key={index}
                            className="flex border-b border-gray-300"
                        >
                            <div className="w-16 border-r border-gray-300 p-1">{index + 1}</div>
                            <div className="w-72 border-r border-gray-300 p-1">{note.topic}</div>
                            <div className="w-[750px] border-r border-gray-300 p-1">{note.explanation || ""}</div>
                            <div>
                                {isLoading === "delete" && clickedIndex === index ?
                                    <>
                                        <SpinnerLoader />
                                    </> :
                                    <div
                                        onClick={() => {
                                            handleDelete(note?.id);
                                            setClickedIndex(index)

                                        }}
                                        className="w-20 p-1 text-red-600 cursor-pointer hover:underline"
                                    >

                                        Delete
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Notes
