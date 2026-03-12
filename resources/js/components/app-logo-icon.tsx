import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(
    props: ImgHTMLAttributes<HTMLImageElement>,
) {
    return (
        <img
            src="/images/cimc_logo.png"
            alt="CIMC Logo"
            className="h-8 w-auto object-contain"
            {...props}
        />
    );
}
