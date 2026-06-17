
export function BackgroundGrid({backgrounds, handleUpdate}: {
    backgrounds: string[],
    handleUpdate: (id: string) => void
}) {
    return (
        <div className="background-container grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            {backgrounds.map((id) => (
                <div key={id} className="relative aspect-4/3">
                    <img src={`/backgrounds/thumbnails/${id}.webp`}
                         className="rounded-lg object-cover w-full h-full"
                         alt={`Background ${id}`}
                    />
                    <div className="absolute right-4 bottom-4">
                        <button
                            className="btn border bg-bg_h"
                            aria-label={`apply background ${id}`}
                            onClick={() => handleUpdate(id)}
                        >apply
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}