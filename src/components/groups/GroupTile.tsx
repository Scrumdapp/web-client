import {Group} from "../../js/models/group.ts";

interface GroupTileProps {
    group: Group;
}


export function GroupTile({ group }: GroupTileProps) {

    return (
            <div className="flex w-full aspect-square bg-bg_h border rounded-2xl hover:bg-bg2">
                <div className="p-2 lg:p-6 lg:space-y-5">
                    <p className="text-xs lg:text-2xl p-2">{group.name}</p>
                    <img
                        src="https://i.sstatic.net/6M513.png"
                        alt={"Group Image"}
                        className="object-cover h-[70%] flex rounded-2xl overflow-hidden"
                    />
            </div>
        </div>
    );
        }