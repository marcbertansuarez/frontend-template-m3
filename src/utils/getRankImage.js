import Radiant from '../images/radiant.png';
import Ascendant from '../images/ascendant.png';
import Immortal from '../images/immortal.png';
import Diamond from '../images/diamond.png';
import Platinum from '../images/platinum.png';

export default function getMapImage(index) {
    const images = {
        0: Radiant,
        1: Immortal,
        2: Ascendant,
        3: Diamond,
        4: Platinum
    }
    return images[index]
}