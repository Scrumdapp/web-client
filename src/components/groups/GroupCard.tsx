import { PartialGroup } from "../../js/models/group.ts";

interface GroupCardProps {
    group: PartialGroup;
}


export function GroupCard({ group }: GroupCardProps) {
    return (
        <div className="card hover:bg-bg2! wrap-break-word overflow-hidden">
            <p className="text-lg pb-2 overflow-hidden">{group.name}</p>
            <img
                src="https://http.cat/images/404.jpg"
                alt="Group Image"
                className="object-cover h-full rounded overflow-hidden"
            />
        </div >
    );
}
