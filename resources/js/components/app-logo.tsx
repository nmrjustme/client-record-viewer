import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <div className="flex items-center">
            <div className="flex w-20 items-center justify-center">
                <AppLogoIcon className="h-16 w-auto object-contain" />
            </div>

            <div className="ml-2 grid text-left text-sm">
                <span className="truncate leading-tight font-semibold">
                    CIMC Records
                </span>
            </div>
        </div>
    );
}
