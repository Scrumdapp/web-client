import {useState} from "react";

export function BackgroundGrid({backgrounds, handleUpdate}: {
    backgrounds: string[],
    handleUpdate: (id: string) => void
}) {
    return (
        <div className="background-container grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            {backgrounds.map((id) => (
                <div key={id}>
                    <BackgroundTile id={id} handleUpdate={handleUpdate} />
                </div>
            ))}
        </div>
    )
}

function BackgroundTile({id, handleUpdate}: {
    id: string,
    handleUpdate: (id: string) => void
}) {

    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div className="relative w-64 aspect-4/3 overflow-hidden rounded-lg">
            {!isLoaded && (
                <div className="absolute inset-0 animate-pulse bg-bg2/30" />
            )}

            <img
                src={`/backgrounds/thumbnails/${id}.webp`}
                alt={`Background ${id}`}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setIsLoaded(true)}
            />

            <div className="absolute right-4 bottom-4">
                <button
                    className="btn border bg-bg_h"
                    aria-label={`apply background ${id}`}
                    onClick={() => handleUpdate(id)}
                >
                    apply
                </button>
            </div>
        </div>
    )
}