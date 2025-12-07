import axios from "axios";
import React, { useEffect, useState } from "react";
import SpinnerLoader from "./Loader/SpinnerLoader";
import { BackendURL } from "../config/ApiRoute";

const TeacherForm = () => {
    const [teacherName, setTeacherName] = useState("");
    const [email, setEmail] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [subject, setSubject] = useState("");
    const [teacherClass, setTeacherClass] = useState("");

    const [teacherList, setTeacherList] = useState([])
    const [isLoading, setIsLoading] = useState("");
    const [clickedIndex, setClickedIndex] = useState(null)
    console.log("teacherList", teacherList)

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`${BackendURL}/teachers`);
            setTeacherList(response.data);
        };
        fetchUsers();
    }, [])

    const getTeachers = async () => {
        const response = await axios.get(`${BackendURL}/teachers`);
        console.log(response.data);
        setTeacherList(response.data);
    }

    const clearState = () => {
        setTeacherName("");
        setEmail("");
        setTeacherId("");
        setSubject("");
        setTeacherClass("");
    }

    const handleSubmit = async () => {

        if (!teacherName || !email) {
            alert("teacherName and email are required fields.");
            return;
        }
        const payload = {
            teacherName: teacherName,
            teacherSalary: email,
            teacherGender: teacherId,
            teacherSubject: subject,
            teacherClass: teacherClass,
        };
        setIsLoading("post")
        try {
            await axios.post(`${BackendURL}/teachers`, payload);
            getTeachers()
            clearState()
            setIsLoading("")
        } catch (error) {
            console.error("Error creating user:", error);
        } finally {
            setIsLoading("")
        }
        console.log("Teacher teacherList:", payload);
    };

    const handleDelete = async (userId) => {
        setIsLoading("delete")
        try {
            await axios.delete(`${BackendURL}/teachers/${userId}`);
            getTeachers()
            setIsLoading("")
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            setIsLoading("")
        }
    }



    return (
        <div className="w-full bg-white rounded-lg ">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">

                <div>
                    <label className="block text-sm font-medium mb-1">Teacher Name</label>
                    <input
                        type="text"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        className="w-full border rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter teacher name"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">salary</label>
                    <input
                        type="number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter salary"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>

                    <select
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                        className="w-full border rounded-md px-2 py-1 bg-white outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="" hidden>Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                {/* Subject */}
                <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full border rounded-md px-2 py-1 bg-white outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="" hidden>Select subject</option>
                        <option value="Math">Math</option>
                        <option value="Biology">Biology</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                    </select>
                </div>

                {/* Teacher Class */}
                <div>
                    <label className="block text-sm font-medium mb-1">Teacher Class</label>
                    <select
                        value={teacherClass}
                        onChange={(e) => setTeacherClass(e.target.value)}
                        className="w-full border rounded-md px-2 py-1 bg-white outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="" hidden>Select class</option>
                        {[5, 6, 7, 8, 9, 10].map((cls) => (
                            <option key={cls} value={cls}>{cls}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center items-end align-bottom">
                    {isLoading === "post" ?
                        <>
                            <SpinnerLoader />
                        </> :
                        <div
                            onClick={handleSubmit}
                            className="w-full py-1 text-center bg-blue-500 text-white cursor-pointer hover:bg-blue-600 rounded-md border border-gray-800"
                        >
                            Submit
                        </div>
                    }

                </div>

            </div>

            <div className="w-full border border-gray-300 rounded mt-2">

                {/* Header */}
                <div className="flex font-semibold bg-gray-100 border-b border-gray-300">
                    <div className="w-16 border-r border-gray-300 p-1">Sr.No</div>
                    <div className="w-96 border-r border-gray-300 p-1">Teacher Name</div>
                    <div className="w-44 border-r border-gray-300 p-1">Salary</div>
                    <div className="w-32 border-r border-gray-300 p-1">Gender</div>
                    <div className="w-40 border-r border-gray-300 p-1">Subject</div>
                    <div className="w-32 border-r border-gray-300 p-1">Class</div>

                    <div className="w-20 p-1">Delete</div>
                </div>

                {/* Scrollable Content */}
                <div className="max-h-96 overflow-y-auto">
                    {[...teacherList]?.reverse().map((teacher, index) => (
                        <div
                            key={index}
                            className="flex border-b border-gray-300"
                        >
                            <div className="w-16 border-r border-gray-300 p-1">{index + 1}</div>
                            <div className="w-96 border-r border-gray-300 p-1">{teacher.teacherName}</div>
                            <div className="w-44 border-r border-gray-300 p-1">{teacher.teacherSalary}</div>
                            <div className="w-32 border-r border-gray-300 p-1">{teacher.teacherGender || ""}</div>
                            <div className="w-40 border-r border-gray-300 p-1">{teacher.teacherSubject}</div>
                            <div className="w-32 border-r border-gray-300 p-1">{teacher.teacherClass || ""}</div>
                            <div>
                                {isLoading === "delete" && clickedIndex === index ?
                                    <>
                                        <SpinnerLoader />
                                    </> :
                                    <div
                                        onClick={() => {
                                            handleDelete(teacher?.id);
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

    );
};

export default TeacherForm;
