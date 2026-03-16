import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHourglass} from "@fortawesome/free-regular-svg-icons";
import type {SizeProp} from "@fortawesome/fontawesome-svg-core";

export function LoadScreen({size="2x"}: {size?: SizeProp}) {
    return (
        <div className="center fade-in">
            <FontAwesomeIcon icon={faHourglass} size={size} className="loading-spinner" />
        </div>
    )
}