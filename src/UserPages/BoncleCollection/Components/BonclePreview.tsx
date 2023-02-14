import { BoncleSetNumber } from "../Domain/SetNumber";

export function BonclePreview(props: {
    readonly setNumber: BoncleSetNumber;
}): JSX.Element {
    const { setNumber } = props;
    // NB: Relative to the page using it
    const url = `./ImageCache/${setNumber}.jpg`;
    return <div 
        className="BonclePreview" 
        style={{ backgroundImage: `url(${url})` }}
    >
        <img
            className="Media"
            src={url} 
            alt={`A picture of LEGO set number ${setNumber}.`}
        />
    </div>;
}
