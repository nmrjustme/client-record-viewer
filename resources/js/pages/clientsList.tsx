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
    const MAX_LENGTH = 15;
    const INITIAL_HRN = '00000000';

    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState({
        first: filters?.first || '',
        last: filters?.last || '',
        mid: filters?.mid || '',
        hrn: filters?.hrn || INITIAL_HRN,
    });

    const handleSearch = () => {
        setIsLoading(true);
        router.get(`/viewer/record-finder`, searchData, {
            preserveState: true,
            replace: true,
            onFinish: () => setIsLoading(false),
        });
    };

    const handleClear = () => {
        setIsLoading(true);
        const clearedData = { first: '', last: '', mid: '', hrn: INITIAL_HRN };
        setSearchData(clearedData);
        router.get(`/viewer/record-finder`, clearedData, {
            preserveState: true,
            replace: true,
            onFinish: () => setIsLoading(false),
        });
    };

    // Helper to render Skeleton Rows
    const SkeletonRow = () => (
        <tr className="animate-pulse">
            <td className="px-8 py-4">
                <div className="h-4 w-24 rounded bg-slate-200"></div>
            </td>
            <td className="px-8 py-4">
                <div className="h-4 w-48 rounded bg-slate-200"></div>
            </td>
            <td className="px-8 py-4 text-center">
                <div className="mx-auto h-5 w-12 rounded bg-slate-200"></div>
            </td>
            <td className="px-8 py-4 text-right">
                <div className="ml-auto h-4 w-20 rounded bg-slate-200"></div>
            </td>
        </tr>
    );

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <Head title="CIMC | Patient Search" />
            <Header />

            <main className="mx-auto max-w-6xl p-8">
                {/* Search Bar Section */}
                <section className="mb-8 rounded-xl border border-slate-300 bg-white p-6 shadow-sm">
                    <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-5">
                        {/* HRN Input */}
                        <div>
                            <label className="mb-1 block font-montserrat text-[10px] font-bold tracking-wider text-blue-600 uppercase italic">
                                Hospital Record No.
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={searchData.hrn}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => {
                                    const val = e.target.value.replace(
                                        /\D/g,
                                        '',
                                    );
                                    if (val.length <= MAX_LENGTH) {
                                        setSearchData({
                                            ...searchData,
                                            hrn: val,
                                        });
                                    }
                                }}
                                onBlur={() => {
                                    if (searchData.hrn === '')
                                        setSearchData({
                                            ...searchData,
                                            hrn: INITIAL_HRN,
                                        });
                                }}
                                className="w-full rounded-md border border-blue-100 bg-blue-50 px-3 py-1.5 font-mono text-sm text-blue-800 outline-none focus:border-blue-500"
                            />
                            <div className="absolute block font-montserrat text-[9px] tracking-wider text-blue-400">
                                7 digits remaining
                            </div>
                        </div>

                        {/* Last Name Input */}
                        <div>
                            <label className="mb-1 block font-montserrat text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={searchData.last}
                                onChange={(e) =>
                                    setSearchData({
                                        ...searchData,
                                        last: e.target.value.replace(
                                            /[0-9]/g,
                                            '',
                                        ),
                                    })
                                }
                                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 uppercase outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* First Name Input */}
                        <div>
                            <label className="mb-1 block font-montserrat text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={searchData.first}
                                onChange={(e) =>
                                    setSearchData({
                                        ...searchData,
                                        first: e.target.value.replace(
                                            /[0-9]/g,
                                            '',
                                        ),
                                    })
                                }
                                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 uppercase outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Middle Name Input */}
                        <div>
                            <label className="mb-1 block font-montserrat text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                                Middle Name
                            </label>
                            <input
                                type="text"
                                value={searchData.mid}
                                onChange={(e) =>
                                    setSearchData({
                                        ...searchData,
                                        mid: e.target.value.replace(
                                            /[0-9]/g,
                                            '',
                                        ),
                                    })
                                }
                                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 uppercase outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-1.5">
                            <button
                                onClick={handleSearch}
                                disabled={isLoading}
                                className="flex-1 cursor-pointer rounded-md bg-blue-800 py-2 font-montserrat text-xs text-white transition-all hover:bg-blue-700 disabled:bg-blue-400"
                            >
                                {isLoading ? '...' : 'Search'}
                            </button>
                            <button
                                onClick={handleClear}
                                disabled={isLoading}
                                className="cursor-pointer rounded-md bg-slate-200 px-3 py-2 font-montserrat text-xs text-slate-600 transition-all hover:bg-slate-300 disabled:opacity-50"
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
                                <th className="border-b border-slate-200 px-8 py-3">
                                    HRN
                                </th>
                                <th className="border-b border-slate-200 px-8 py-3">
                                    Patient Name
                                </th>
                                <th className="border-b border-slate-200 px-8 py-3 text-center">
                                    Files
                                </th>
                                <th className="border-b border-slate-200 px-8 py-3 text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                // Show 5 skeleton rows while loading
                                <>
                                    <SkeletonRow />
                                    <SkeletonRow />
                                    <SkeletonRow />
                                    <SkeletonRow />
                                    <SkeletonRow />
                                </>
                            ) : patients.length > 0 ? (
                                patients.map((p) => (
                                    <tr
                                        key={p.id}
                                        className="transition-colors hover:bg-blue-50/30"
                                    >
                                        <td className="px-8 py-4 font-montserrat text-xs font-bold text-blue-600">
                                            {p.hrn}
                                        </td>
                                        <td className="px-8 py-4 font-montserrat text-sm font-medium text-slate-900 capitalize">
                                            {p.lastname}, {p.firstname}{' '}
                                            {p.middlename || ''}
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <span className="rounded bg-slate-100 px-2 py-1 font-montserrat text-[10px] font-bold text-slate-600">
                                                📄 {p.records_count} PDF(s)
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <Link
                                                href={`/viewer/${p.hrn}/folder`}
                                                className="cursor-pointer font-montserrat text-xs font-bold text-blue-600 hover:underline"
                                            >
                                                View File →
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="py-20 text-center font-montserrat text-xs text-slate-400"
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
