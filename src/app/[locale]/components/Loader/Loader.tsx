export default function Loader() {
    return (
        // <div className={'h-screen w-full flex items-center justify-center bg-black/10 z-50'}>
            <div
                className={
                    'h-6 w-6 mx-auto animate-spin rounded-full border-3 border-solid border-gray-300] border-r-transparent'
                }
              //  role={'status'}
            >
                <span className={'sr-only'}>Loading...</span>
            </div>
        // </div>
    );
}