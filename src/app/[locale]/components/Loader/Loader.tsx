export default function Loader() {
    return (
        <div className={`h-6 w-6 mx-auto animate-spin rounded-full border-2 border-solid border-gray-300] 
                        border-r-transparent`}>
            <span className={'sr-only'}>Loading...</span>
        </div>
    );
}