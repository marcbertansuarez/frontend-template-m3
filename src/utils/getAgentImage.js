import astra from '../images/astra.png';
import breach from '../images/breach.png';
import brimstone from '../images/brimstone.png';
import chamber from '../images/chamber.png';
import cypher from '../images/cypher.png';
import gekko from '../images/displayiconsmall.png';
import fade from '../images/fade.png';
import harbor from '../images/harbor.png';
import jett from '../images/jett.png';
import kayo from '../images/kayo.png';
import kj from '../images/kj.png';
import neon from '../images/neon.png';
import omen from '../images/omen.png';
import phoenix from '../images/phoenix.png';
import raze from '../images/raze.png';
import reyna from '../images/reyna.png';
import sage from '../images/sage.png';
import skye from '../images/skye.png';
import sova from '../images/sova.png';
import viper from '../images/viper.png';
import yoru from '../images/yoru.png';

export default function getAgentImage(agent) {
const images = {
    'Astra': astra,
    'Breach': breach,
    'Brimstone': brimstone,
    'Chamber': chamber,
    'Cypher': cypher,
    'Gekko': gekko,
    'Fade': fade,
    'Harbor': harbor,
    'Jett': jett,
    'KAY/O': kayo,
    'KillJoy': kj,
    'Neon': neon,
    'Omen': omen,
    'Phoenix': phoenix,
    'Raze': raze,
    'Reyna': reyna,
    'Sage': sage,
    'Skye': skye,
    'Sova': sova,
    'Viper': viper,
    'Yoru': yoru
}
    return images[agent];
}