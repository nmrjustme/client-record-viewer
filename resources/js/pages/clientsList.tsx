import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import Header from '@/components/header';

interface Patient {
    id: number;
    hrn: string;
    firstname: string;
    middlename: string | null;
    lastname: string;
    records_count: number;
}

interface Props {
    patients: Patient[];
    filters: any;
}

export default function RecordFinder({ patients = [], filters }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const MAX_LENGTH = 15;
    const ZERO_STRING = "00000000";

    const [searchData, setSearchData] = useState({
        first: filters?.first || '',
        last: filters?.last || '',
        mid: filters?.mid || '',
        hrn: filters?.hrn || '',
    });

    const handleCopy = () => {
        navigator.clipboard.writeText(ZERO_STRING);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Check if HRN is valid (either empty or exactly 15 digits)
    const isHrnValid = searchData.hrn.length === 0 || searchData.hrn.length === MAX_LENGTH;
    const isSearchDisabled = isLoading || (searchData.hrn.length > 0 && searchData.hrn.length < MAX_LENGTH);

    const handleSearch = () => {
        // Prevent search if HRN is partially filled
        if (searchData.hrn.length > 0 && searchData.hrn.length < MAX_LENGTH) {
            return;
        }

        setIsLoading(true);
        // Padding logic remains as a safety net, though UI now enforces 15
        const finalHrn = searchData.hrn ? searchData.hrn.padStart(MAX_LENGTH, '0') : '';
        const dataToSend = {
            hrn: finalHrn,
            first: searchData.first,
            last: searchData.last,
            mid: searchData.mid
        };
        const filteredData = Object.fromEntries(
            Object.entries(dataToSend).filter(([_, v]) => v !== '')
        );

        router.get(`/viewer/record-finder`, filteredData, {
            preserveState: true,
            replace: true,
            onFinish: () => setIsLoading(false),
        });
    };

    const handleClear = () => {
        setIsLoading(true);
        setSearchData({ first: '', last: '', mid: '', hrn: '' });
        router.get(`/viewer/record-finder`, {}, {
            preserveState: false,
            replace: true,
            onFinish: () => setIsLoading(false),
        });
    };

    const SkeletonRow = () => (
        <tr className="animate-pulse">
            <td className="px-8 py-4"><div className="h-4 w-24 rounded bg-slate-200"></div></td>
            <td className="px-8 py-4"><div className="h-4 w-48 rounded bg-slate-200"></div></td>
            <td className="px-8 py-4 text-center"><div className="mx-auto h-5 w-12 rounded bg-slate-200"></div></td>
            <td className="px-8 py-4 text-right"><div className="ml-auto h-4 w-20 rounded bg-slate-200"></div></td>
        </tr>
    );

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <Head title="CIMC | Patient Search" />
            <Header />

            <main className="mx-auto max-w-6xl p-8">
                <section className="mb-8 rounded-xl border border-slate-300 bg-white p-6 shadow-sm">
                    <div className="mb-4">
                        <h2 className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Search Patient Records
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-12">
                        {/* HRN Field */}
                        <div className="md:col-span-3">
                            <div className="mb-1 flex items-center justify-between">
                                <label className="block font-montserrat text-[10px] font-bold tracking-wider text-blue-600 uppercase">
                                    Hospital Record No.
                                </label>
                                
                                <button 
                                    onClick={handleCopy}
                                    className="flex items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                                    title="Copy 8 Zeros"
                                >
                                    <span className="font-mono text-[9px] font-bold cursor-pointer">{ZERO_STRING}</span>
                                    {copied ? (
                                        <span className="text-[9px] font-bold text-green-500">✓</span>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={searchData.hrn}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, ''); 
                                    if (val.length <= MAX_LENGTH) {
                                        setSearchData({ ...searchData, hrn: val });
                                    }
                                }}
                                className={`w-full rounded-md border px-3 py-2 font-mono text-sm tracking-widest outline-none transition-colors ${
                                    searchData.hrn.length > 0 && searchData.hrn.length < MAX_LENGTH 
                                    ? 'border-orange-300 bg-orange-50 text-orange-800 focus:border-orange-500' 
                                    : 'border-blue-100 bg-blue-50 text-blue-800 focus:border-blue-500'
                                }`}
                            />
                            {/* Counter with conditional warning color */}
                            <div className="mt-1 flex justify-between items-center px-1">
                                <span className="text-[9px] font-bold text-slate-400 uppercase">
                                    {searchData.hrn.length > 0 && searchData.hrn.length < MAX_LENGTH && "15 digits required"}
                                </span>
                                <span className={`font-mono text-[10px] font-bold ${
                                    searchData.hrn.length === MAX_LENGTH ? 'text-green-600' : 
                                    searchData.hrn.length > 0 ? 'text-orange-500' : 'text-slate-400'
                                }`}>
                                    {searchData.hrn.length}/{MAX_LENGTH}
                                </span>
                            </div>
                        </div>

                        {/* Names and Actions */}
                        <div className="md:col-span-2">
                            <label className="mb-1 block font-montserrat text-[10px] font-bold tracking-wider text-slate-500 uppercase">Last Name</label>
                            <input
                                type="text"
                                value={searchData.last}
                                onChange={(e) => setSearchData({ ...searchData, last: e.target.value.replace(/[0-9]/g, '') })}
                                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 uppercase outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="md:col-span-3">
                            <label className="mb-1 block font-montserrat text-[10px] font-bold tracking-wider text-slate-500 uppercase">First Name</label>
                            <input
                                type="text"
                                value={searchData.first}
                                onChange={(e) => setSearchData({ ...searchData, first: e.target.value.replace(/[0-9]/g, '') })}
                                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 uppercase outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-1 block font-montserrat text-[10px] font-bold tracking-wider text-slate-500 uppercase">Middle Name</label>
                            <input
                                type="text"
                                value={searchData.mid}
                                onChange={(e) => setSearchData({ ...searchData, mid: e.target.value.replace(/[0-9]/g, '') })}
                                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 uppercase outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex gap-2 pt-5 md:col-span-2">
                            <button
                                onClick={handleSearch}
                                disabled={isSearchDisabled}
                                className={`flex-1 cursor-pointer rounded-md py-2 font-montserrat text-xs font-bold text-white transition-all ${
                                    isSearchDisabled 
                                    ? 'bg-slate-300 cursor-not-allowed' 
                                    : 'bg-blue-800 hover:bg-blue-700 shadow-md active:scale-95'
                                }`}
                            >
                                {isLoading ? '...' : 'SEARCH'}
                            </button>
                            <button
                                onClick={handleClear}
                                type="button"
                                className="cursor-pointer rounded-md bg-slate-200 px-3 py-2 font-montserrat text-xs text-slate-600 hover:bg-slate-300 transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </section>

                {/* Table section remains the same */}
                <section className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
                    <div className="border-b bg-slate-50/50 px-8 py-3">
                        <h3 className="font-montserrat text-sm text-slate-700">
                            Displaying {patients.length} Patient(s)
                        </h3>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 font-montserrat text-[10px] tracking-widest text-slate-400 uppercase">
                            <tr>
                                <th className="border-b border-slate-200 px-8 py-3">HRN</th>
                                <th className="border-b border-slate-200 px-8 py-3">Patient Name</th>
                                <th className="border-b border-slate-200 px-8 py-3 text-center">Files</th>
                                <th className="border-b border-slate-200 px-8 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <><SkeletonRow /><SkeletonRow /><SkeletonRow /></>
                            ) : patients.length > 0 ? (
                                patients.map((p) => (
                                    <tr key={p.id} className="transition-colors hover:bg-blue-50/30">
                                        <td className="px-8 py-4 font-montserrat text-xs font-bold text-blue-600">{p.hrn}</td>
                                        <td className="px-8 py-4 font-montserrat text-sm font-medium text-slate-900 capitalize">
                                            {p.lastname}, {p.firstname} {p.middlename || ''}
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <span className="rounded bg-slate-100 px-2 py-1 font-montserrat text-[10px] font-bold text-slate-600">
                                                📄 {p.records_count} PDF(s)
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <Link href={`/viewer/${p.hrn}/folder`} className="cursor-pointer font-montserrat text-xs font-bold text-blue-600 hover:underline">
                                                View File →
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-20 text-center font-montserrat text-xs text-slate-400">No results found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}