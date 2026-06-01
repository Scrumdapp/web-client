import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCloudBolt, faCloudRain, faCloudSun, faSun, faCloudSunRain, faCloudShowersHeavy } from "@fortawesome/free-solid-svg-icons";

export function GroupTimelineTrendsWeather() {
    return(
    <div>
        <table>
            <thead>
            <tr>
                <th></th>
                <th>{'>90%'}</th>
                <th>{'=<90%'}</th>
                <th>{'=<80%'}</th>
                <th>{'=<70%'}</th>
                <th>{'=<60%'}</th>
                <th>{'=<50%'}</th>
                <th>{'=<40%'}</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="w-48 pr-2"><h2>Name</h2></td>
                    <td className="py-1"><FontAwesomeIcon icon={faSun} /></td>
                    <td className="py-1"><FontAwesomeIcon icon={faCloudSun} /></td>
                    <td className="py-1"><FontAwesomeIcon icon={faCloud} /></td>
                    <td className="py-1"><FontAwesomeIcon icon={faCloudSunRain} /></td>
                    <td className="py-1"><FontAwesomeIcon icon={faCloudRain} /></td>
                    <td className="py-1"><FontAwesomeIcon icon={faCloudShowersHeavy} /></td>
                    <td className="py-1"><FontAwesomeIcon icon={faCloudBolt} /></td>
                </tr>

            </tbody>
        </table>
    </div>
    )
}