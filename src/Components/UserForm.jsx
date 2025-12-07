import React, { useEffect, useState } from "react";
import axios from "axios";
import { BackendURL } from "../config/ApiRoute";

export default function UserForm() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [salary, setSalary] = useState("");
    const [comment, setComment] = useState("");
    const [userList, setUserList] = useState([]);
    const [userSingle, setSingleUser] = useState(null);

    const ClearState = () => {
        setComment("");
        setName("");
        setAge("");
        setSalary("")
    }
    console.log("userSingle userList", userList)
    console.log("userSingle", userSingle)

    useEffect(() => {
        const Id = null; // Example user ID
        if (Id) {
            const fetchUsers = async () => {
                const response = await axios.get(`${BackendURL}/users/${Id}`);
                setSingleUser(response.data);
            };
            fetchUsers();
        }

    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`${BackendURL}/users`);
            setUserList(response.data);
        };
        fetchUsers();
    }, [])

    const getUsers = async () => {
        const response = await axios.get(`${BackendURL}/users`);
        console.log(response.data);
        setUserList(response.data);
    }

    const handleSubmit = async () => {
        if (!name || !age) {
            alert("Name and Age are required fields.");
            return;
        }
        const payload = {
            name,
            age: Number(age),
            notes: comment,
            salary: salary
        };

        try {
            await axios.post(`${BackendURL}/users`, payload);
            getUsers();
            ClearState();
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };


    const handleDelete = async (userId) => {
        try {
            await axios.delete(`${BackendURL}/users/users/${userId}`);
            getUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }


    return (
        <div className="w-full px-1">

            <div className="gap-4 w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">

                <div className="flex-1">
                    <label className="block mb-1 text-sm text-gray-700 text-start">Student Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-purple-300 rounded mb-3 focus:ring-2 focus:ring-purple-400"
                        placeholder="enter name"
                    />
                </div>

                <div className="flex-1">
                    <label className="block mb-1 text-sm text-gray-700 text-start">Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-3 py-2 border border-purple-300 rounded mb-3 focus:ring-2 focus:ring-purple-400"
                        placeholder="enter age"
                    />
                </div>
                <div className="flex-1">
                    <label className="block mb-1 text-sm text-gray-700 text-start">Salary</label>
                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="w-full px-3 py-2 border border-purple-300 rounded mb-3 focus:ring-2 focus:ring-purple-400"
                        placeholder="enter salary"
                    />
                </div>

                <div className="flex-1">
                    <label className="block mb-1 text-sm text-gray-700 text-start">Comment</label>
                    <textarea
                        rows={1}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-3 py-2 border border-purple-300 rounded mb-4 focus:ring-2 focus:ring-purple-400"
                        placeholder="enter comment"
                    />
                </div>
                <div className="flex justify-start items-center">
                    <div
                        onClick={() => handleSubmit()}
                        className="w-full py-1 text-center bg-blue-500 text-white cursor-pointer hover:bg-blue-600 rounded-md border border-gray-800"
                    >
                        Submit
                    </div>
                </div>
            </div>

            <div>
                <div className="w-full border border-gray-300 rounded mt-2">

                    <div className="flex font-semibold bg-gray-100 border-b border-gray-300 text-sm sm:text-base">
                        <div className="w-16 border-r border-gray-300 p-2">#</div>
                        <div className="flex-1 min-w-0 border-r border-gray-300 p-2">Name</div>
                        <div className="w-24 sm:w-28 border-r border-gray-300 p-2">Age</div>
                        <div className="w-28 sm:w-32 border-r border-gray-300 p-2">Salary</div>
                        <div className="flex-[2] min-w-0 border-r border-gray-300 p-2 break-words">
                            Notes
                        </div>
                        <div className="w-20 p-2">Delete</div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {[...userList]?.reverse().map((user, index) => (
                            <div key={index} className="flex border-b border-gray-300 text-sm sm:text-base">

                                <div className="w-16 border-r border-gray-300 p-2">
                                    {index + 1}
                                </div>

                                <div className="flex-1 min-w-0 border-r border-gray-300 p-2 break-words">
                                    {user.name}
                                </div>

                                <div className="w-24 sm:w-28 border-r border-gray-300 p-2">
                                    {user.age}
                                </div>

                                <div className="w-28 sm:w-32 border-r border-gray-300 p-2">
                                    {user.salary || ""}
                                </div>

                                <div className="flex-[2] min-w-0 border-r border-gray-300 p-2 break-words">
                                    {user.notes}
                                </div>

                                <div
                                    onClick={() => handleDelete(user?.id)}
                                    className="w-20 p-2 text-red-600 cursor-pointer hover:underline"
                                >
                                    Delete
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
