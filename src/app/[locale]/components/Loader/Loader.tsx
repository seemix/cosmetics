export default function Loader() {
    return (
        <div className={`h-4 w-4 sm:h-6 sm:w-6 mx-auto animate-spin rounded-full border-1 sm:border-2 
                        border-solid border-gray-300] border-r-transparent`}>
            <span className={'sr-only'}>Loading...</span>
        </div>
    );
}