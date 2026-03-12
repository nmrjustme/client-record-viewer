import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { patient } from '@/routes';
import type { BreadcrumbItem } from '@/types';

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
    filters?: any;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Patient',
        href: patient(),
    },
];

export default function PatientPage({ patients = [], filters }: Props) {
    const [searchData, setSearchData] = useState({
        first: filters?.first || '',
        last: filters?.last || '',
        mid: filters?.mid || '',
        hrn: filters?.hrn || '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        hrn: '',
        firstname: '',
        middlename: '',
        lastname: '',
    });

    // Search (filter) patients
    const handleSearch = () => {
        router.get('/patient', searchData, {
            preserveState: true,
            replace: true,
        });
    };

    const handleClear = () => {
        const clearedData = { first: '', last: '', mid: '', hrn: '' };
        setSearchData(clearedData);
        router.get('/patient', clearedData, {
            preserveState: true,
            replace: true,
        });
    };

    // Add Patient
    const handleAddPatient = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/patient', formData, {
            onSuccess: () => {
                setModalOpen(false);
                setFormData({
                    hrn: '',
                    firstname: '',
                    middlename: '',
                    lastname: '',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patients" />

            <div className="min-h-screen bg-slate-100 p-4 font-sans transition-colors dark:bg-slate-900">
                {/* Search Section */}
                <section className="mb-8 rounded-xl border border-slate-300 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
                    <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-5">
                        {/* HRN */}
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
                                className="w-full rounded-md border border-blue-100 bg-blue-50 px-3 py-1.5 font-mono text-sm text-blue-800 transition-colors outline-none focus:border-blue-500 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-200"
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
                                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 transition-colors outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
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
                                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 transition-colors outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
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
                                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 transition-colors outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-1.5">
                            {/* Add Patient */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.post(
                                        '/patient',
                                        {
                                            hrn: searchData.hrn,
                                            lastname: searchData.last,
                                            firstname: searchData.first,
                                            middlename: searchData.mid,
                                        },
                                        {
                                            onSuccess: () => {
                                                setSearchData({
                                                    hrn: '',
                                                    last: '',
                                                    first: '',
                                                    mid: '',
                                                });
                                            },
                                        },
                                    );
                                }}
                                className="flex-1 cursor-pointer rounded-md bg-blue-800 py-2 font-montserrat text-xs text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                            >
                                Add Patient
                            </button>

                            {/* Clear Inputs */}
                            <button
                                onClick={handleClear}
                                className="cursor-pointer rounded-md bg-slate-200 px-3 py-2 font-montserrat text-xs text-slate-600 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </section>

                {/* Table Section */}
                <section className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
                    <div className="border-b bg-slate-50/50 px-8 py-3 transition-colors dark:bg-slate-700/50">
                        <h3 className="font-montserrat text-sm text-slate-700 dark:text-slate-200">
                            Displaying {patients.length} Patient(s)
                        </h3>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 font-montserrat text-[10px] tracking-widest text-slate-400 uppercase transition-colors dark:bg-slate-700 dark:text-slate-300">
                            <tr>
                                <th className="px-8 py-3">HRN</th>
                                <th className="px-8 py-3">Patient Name</th>
                                <th className="px-8 py-3 text-center">Files</th>
                                <th className="px-8 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 transition-colors dark:divide-slate-700">
                            {patients.length > 0 ? (
                                patients.map((p) => (
                                    <tr
                                        key={p.id}
                                        className="transition-colors hover:bg-blue-50/30 dark:hover:bg-slate-700/50"
                                    >
                                        <td className="px-8 py-4 font-montserrat text-xs text-blue-600 dark:text-blue-400">
                                            {p.hrn}
                                        </td>
                                        <td className="px-8 py-4 font-montserrat text-slate-900 capitalize dark:text-slate-100">
                                            {p.lastname}, {p.firstname}{' '}
                                            {p.middlename || ''}
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <span className="rounded bg-slate-100 px-2 py-1 font-montserrat text-[10px] text-slate-600 transition-colors dark:bg-slate-700 dark:text-slate-300">
                                                📄 {p.records_count} PDF(s)
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <button className="cursor-pointer font-montserrat text-xs text-blue-600 hover:underline dark:text-blue-400">
                                                View File →
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="py-10 text-center font-montserrat text-xs text-slate-400 dark:text-slate-500"
                                    >
                                        No patients found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>

                {/* Modal for Add Patient */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-colors">
                        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg transition-colors dark:bg-slate-800 dark:text-white">
                            <h2 className="mb-4 font-montserrat text-lg text-slate-800 dark:text-slate-100">
                                Add Patient
                            </h2>
                            <form
                                onSubmit={handleAddPatient}
                                className="space-y-3"
                            >
                                <input
                                    type="text"
                                    placeholder="HRN"
                                    value={formData.hrn}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            hrn: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border px-3 py-1.5 text-sm transition-colors outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.lastname}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            lastname: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border px-3 py-1.5 text-sm transition-colors outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstname}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            firstname: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border px-3 py-1.5 text-sm transition-colors outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Middle Name"
                                    value={formData.middlename}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            middlename: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border px-3 py-1.5 text-sm transition-colors outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                />
                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(false)}
                                        className="rounded-md bg-slate-200 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-blue-800 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
