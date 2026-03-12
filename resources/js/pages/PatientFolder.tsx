import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '@/components/header';

interface FileRecord {
    id: number;
    file_name: string;
    created_at: string;
    updated_at: string; // Added updated_at
}

interface Patient {
    hrn: string;
    firstname: string;
    lastname: string;
    records: FileRecord[];
}

export default function PatientFolder({ patient }: { patient: Patient }) {
    // 1. Identify the latest file based on the NEWEST of either created_at or updated_at
    const getLatestTime = (file: FileRecord) => {
        const created = new Date(file.created_at).getTime();
        const updated = new Date(file.updated_at).getTime();
        return Math.max(created, updated);
    };

    const latestFile = patient.records.length > 0 
        ? [...patient.records].sort((a, b) => getLatestTime(b) - getLatestTime(a))[0] 
        : null;

    // 2. Filter out the latest file from the archive grid
    const otherFiles = patient.records.filter(file => file.id !== latestFile?.id);

    return (
        <div className="min-h-screen bg-slate-50 font-montserrat">
            <Head title={`Folder | ${patient.lastname}`} />
            <Header />

            <main className="mx-auto max-w-5xl p-8">
                <Link
                    href={`/viewer/record-finder`}
                    className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-blue-600"
                >
                    ← Back to Search
                </Link>
                
                <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 capitalize">
                            {patient.lastname}, {patient.firstname}
                        </h1>
                        <p className="mt-1 text-sm tracking-widest uppercase text-slate-500">
                            HRN: 
                            <span className="font-bold text-blue-600 ml-2">
                                {patient.hrn}
                            </span>
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-700">
                            {patient.records.length} Documents
                        </span>
                    </div>
                </div>

                {/* --- LATEST UPDATE SECTION --- */}
                {latestFile && (
                    <section className="mb-12">
                        <h3 className="mb-4 text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase italic">
                            Most Recent Activity
                        </h3>
                        <div className="group relative flex items-center gap-6 rounded-2xl border-1 border-blue-400 bg-white p-6 shadow-md transition-all">
                            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-5xl transition-colors group-hover:text-white">
                                📄
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-slate-900">
                                    {latestFile.file_name}
                                </h4>
                                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                                        Created: {new Date(latestFile.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">
                                        Last Updated: {new Date(latestFile.updated_at).toLocaleString(undefined, {
                                            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                            <a
                                href={`/view-record/${latestFile.file_name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-xs font-bold text-white transition-all hover:bg-blue-700 shadow-blue-200 shadow-lg"
                            >
                                OPEN FILE
                            </a>
                        </div>
                    </section>
                )}

                {/* --- ARCHIVE SECTION --- */}
                <section>
                    <h3 className="mb-4 text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                        Archive List
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {otherFiles.length > 0 ? (
                            otherFiles.map((file) => (
                                <div
                                    key={file.id}
                                    className="group relative flex flex-col items-center justify-center rounded-2xl border border-slate-300 hover:border-red-600 bg-white p-6 text-center transition-all"
                                >
                                    <a
                                        href={`/view-record/${file.file_name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute inset-0 z-10"
                                    />

                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-slate-50 text-4xl group-hover:bg-red-500 group-hover:text-white transition-colors">
                                        📄
                                    </div>

                                    <h4 className="line-clamp-2 w-full px-2 text-sm font-semibold text-slate-800 break-words group-hover:text-blue-600">
                                        {file.file_name}
                                    </h4>
                                    
                                    <div className="mt-2 flex flex-col gap-0.5">
                                        <p className="text-[9px] font-medium uppercase text-slate-400">
                                            Upd: {new Date(file.updated_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-200 py-10 text-center">
                                <p className="text-slate-400 text-sm">No other documents found.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}