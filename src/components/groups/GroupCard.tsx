import { PartialGroup } from "../../js/models/group.ts";

interface GroupCardProps {
    group: PartialGroup;
}

export function GroupCard({ group }: GroupCardProps) {
    const backgroundUrl = group.background_preference ? `/backgrounds/thumbnails/${group.background_preference}.webp`: "https://http.cat/images/404.jpg"

    return (
        <div className="card hover:bg-bg2!">
            <p className="text-lg pb-2">{group.name}</p>
            <img
                src={backgroundUrl}
                alt={`Group image for ${group.name}`}
                className="aspect-4/3 object-cover h-full rounded overflow-hidden"
            />
        </div >
    );
}
