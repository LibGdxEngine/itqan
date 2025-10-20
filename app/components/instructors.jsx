"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import apiClient from "@/app/lib/api/client";


export default function InstructorsSection() {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

    useEffect(() => {

        async function fetchInstructors() {
            try {
                const res = await apiClient.get(`/instructors/`);
                setInstructors(res.data);
            } catch (err) {
                console.error("Failed to fetch instructors:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchInstructors();
    }, []);

    return (
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                    المشايخ والمحاضرون
                </h2>
                <p className="text-blue-700 mb-12 max-w-2xl mx-auto leading-relaxed">
                    نخبة من العلماء والمدرسين لتقديم العلوم الشرعية بأسلوب منهجي.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {instructors.map((inst, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-blue-100"
                        >
                            <div className="relative w-full h-64">
                                <Image
                                    src={`${API_URL}${inst.image}`}
                                    alt={inst.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-6 text-right">
                                <h3 className="text-xl font-bold text-blue-900 mb-1">{inst.name}</h3>
                                <p className="text-blue-600 font-medium mb-3">{inst.name}</p>
                                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                                    {inst.description}
                                </p>
                                <button
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg py-2 font-semibold hover:opacity-90 transition">
                                    عرض الدورات
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
