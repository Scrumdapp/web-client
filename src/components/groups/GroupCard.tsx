import { Group } from "../../js/models/group.ts";

interface GroupCardProps {
  group: Group;
}


export function GroupCard({ group }: GroupCardProps) {

  return (
    <div className="card hover:bg-bg2!">
      <p className="text-xs lg:text-2xl pb-2">{group.name}</p>
      <img
        src="https://http.cat/images/404.jpg"
        alt="Group Image"
        className="object-cover h-full rounded overflow-hidden"
      />
    </div >
  );
}
