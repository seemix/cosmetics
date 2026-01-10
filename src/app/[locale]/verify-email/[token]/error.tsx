'use client';

export default function ErrorComponent({error}: {error: Error;}) {
    return (
        <div className={`mx-auto my-5 text-center w-full max-w-lg border border-red-300 
                         text-lg bg-white p-6 flex flex-col gap-5`}>
            <h2 className={'text-md font-bold text-red-600'}>
                {error.message || 'Verification failed'}
            </h2>
        </div>
    );
}