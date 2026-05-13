import {Group} from "../../js/models/group.ts";

interface GroupTileProps {
    group: Group;
}


export function GroupTile({ group }: GroupTileProps) {

    return (
            <div className="card hover:bg-bg2!">
                <div>
                    <p className="text-xs lg:text-2xl pb-2">{group.name}</p>
                    <img
                        src="https://http.cat/images/404.jpg"
                        alt={"Group Image"}
                        className="object-cover h-[70%] flex rounded-2xl overflow-hidden"
                    />
            </div>
        </div>
    );
        }