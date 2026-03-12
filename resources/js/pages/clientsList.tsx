import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

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
    const [searchData, setSearchData] = useState({
        first: filters?.first || '',
        last: filters?.last || '',
        mid: filters?.mid || '',
        hrn: filters?.hrn || '',
    });

    const handleSearch = () => {
        router.get('/record-finder', searchData, {
            preserveState: true,
            replace: true,
        });
    };

    const handleClear = () => {
        const clearedData = { first: '', last: '', mid: '', hrn: '' };
        setSearchData(clearedData);
        router.get('/record-finder', clearedData, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <Head title="CIMC | Patient Search" />

            <header className="bg-blue sticky top-0 z-50 flex items-center justify-between border border-slate-300 px-8 py-3 backdrop-blur-md">
                <h2 className="flex items-center gap-2 font-montserrat text-xl text-slate-800">
                    <img
                        src="/images/cimc_logo.png"
                        alt="CIMC"
                        className="h-9 w-auto"
                    />
                    CIMC Record
                </h2>
                <span className="rounded bg-slate-100 px-3 py-1 font-montserrat text-xs text-slate-500">
                    SECURE ACCESS ONLY
                </span>
            </header>

            <main className="mx-auto max-w-6xl p-8">
                <section className="mb-8 rounded-xl border border-slate-300 bg-white p-6 shadow-sm">
                    <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-5">
                        {/* HRN - Number Only & 15 Digit Limit */}
                        <div>
                            <label className="mb-1 block font-montserrat text-[10px] tracking-wider text-blue-600 uppercase italic">
                                HRN (Max 15)
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={searchData.hrn}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (/^\d*$/.test(val) && val.length <= 15) {
                                        setSearchData({
                                            ...searchData,
                                            hrn: val,
                                        });
                                    }
                                }}
                                className="w-full rounded-md border border-blue-100 bg-blue-50 px-3 py-1.5 font-mono text-sm text-blue-800 outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="mb-1 block font-montserrat text-[10px] tracking-wider text-slate-500 uppercase">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={searchData.last}
                                onChange={(e) => {
                                    const value = e.target.value.replace(
                                        /[0-9]/g,
                                        '',
                                    );
                                    setSearchData({
                                        ...searchData,
                                        last: value,
                                    });
                                }}
                                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 uppercase outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* First Name */}
                        <div>
                            <label className="mb-1 block font-montserrat text-[10px] tracking-wider text-slate-500 uppercase">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={searchData.first}
                                onChange={(e) => {
                                    const value = e.target.value.replace(
                                        /[0-9]/g,
                                        '',
                                    );
                                    setSearchData({
                                        ...searchData,
                                        first: value,
                                    });
                                }}
                                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 uppercase outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Middle Name */}
                        <div>
                            <label className="mb-1 block font-montserrat text-[10px] tracking-wider text-slate-500 uppercase">
                                Middle Name
                            </label>
                            <input
                                type="text"
                                value={searchData.mid}
                                onChange={(e) => {
                                    const value = e.target.value.replace(
                                        /[0-9]/g,
                                        '',
                                    );
                                    setSearchData({
                                        ...searchData,
                                        mid: value,
                                    });
                                }}
                                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 uppercase outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Compressed Buttons */}
                        <div className="flex gap-1.5">
                            <button
                                onClick={handleSearch}
                                className="flex-1 cursor-pointer rounded-md bg-blue-800 py-2 font-montserrat text-xs text-white transition-all hover:bg-blue-700"
                            >
                                Search
                            </button>
                            <button
                                onClick={handleClear}
                                className="cursor-pointer rounded-md bg-slate-200 px-3 py-2 font-montserrat text-xs text-slate-600 transition-all hover:bg-slate-300"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </section>

                {/* Table Section */}
                <section className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
                    <div className="border-b bg-slate-50/50 px-8 py-3">
                        <h3 className="font-montserrat text-sm text-slate-700">
                            Displaying {patients.length} Patient(s)
                        </h3>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 font-montserrat text-[10px] tracking-widest text-slate-400 uppercase">
                            <tr>
                                <th className="px-8 py-3">HRN</th>
                                <th className="px-8 py-3">Patient Name</th>
                                <th className="px-8 py-3 text-center">Files</th>
                                <th className="px-8 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {patients.length > 0 ? (
                                patients.map((p) => (
                                    <tr
                                        key={p.id}
                                        className="hover:bg-blue-50/30"
                                    >
                                        <td className="px-8 py-4 font-montserrat text-xs text-blue-600">
                                            {p.hrn}
                                        </td>
                                        <td className="px-8 py-4 font-montserrat text-sm text-slate-900 capitalize">
                                            {p.lastname}, {p.firstname}{' '}
                                            {p.middlename || ''}
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <span className="rounded bg-slate-100 px-2 py-1 font-montserrat text-[10px] text-slate-600">
                                                📄 {p.records_count} PDF(s)
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <button className="cursor-pointer font-montserrat text-xs text-blue-600 hover:underline">
                                                View Folder →
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="py-10 text-center font-montserrat text-xs text-slate-400"
                                    >
                                        No results found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}
