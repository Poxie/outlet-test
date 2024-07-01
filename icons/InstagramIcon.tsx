export default function InstagramIcon({ className, size }: {
    className?: string;
    size: number;
}) {
    return(
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 28 28" fill="none">
            <path d="M20.5 1H7.5C3.91015 1 1 3.91015 1 7.5V20.5C1 24.0898 3.91015 27 7.5 27H20.5C24.0898 27 27 24.0898 27 20.5V7.5C27 3.91015 24.0898 1 20.5 1Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.2003 13.1806C19.3607 14.2626 19.176 15.3675 18.6722 16.3383C18.1685 17.3092 17.3713 18.0965 16.3943 18.5883C15.4174 19.0799 14.3102 19.2511 13.2304 19.0773C12.1505 18.9036 11.153 18.3938 10.3796 17.6204C9.60615 16.8469 9.09632 15.8494 8.92255 14.7695C8.74879 13.6897 8.91995 12.5825 9.41169 11.6056C9.90343 10.6286 10.6907 9.83152 11.6616 9.32777C12.6324 8.82402 13.7373 8.63923 14.8193 8.79966C15.9228 8.9633 16.9445 9.47756 17.7335 10.2664C18.5223 11.0554 19.0366 12.0771 19.2003 13.1806Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21.15 6.84985H21.1625" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}