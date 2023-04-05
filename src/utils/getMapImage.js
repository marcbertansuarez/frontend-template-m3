import ascent from '../images/ascent.png';
import bind from '../images/bind.png';
import breeze from '../images/breeze.png';
import fracture from '../images/fracture.png';
import haven from '../images/haven.png';
import icebox from '../images/icebox.png';
import lotus from '../images/lotus.png';
import pearl from '../images/pearl.png';
import split from '../images/split.png';

export default function getMapImage(map) {
    const images = {
        'Ascent': ascent,
        'Bind': bind,
        'Breeze': breeze,
        'Fracture': fracture,
        'Haven': haven,
        'Icebox': icebox,
        'Lotus': lotus,
        'Pearl': pearl,
        'Split': split
    }
    return images[map]
}