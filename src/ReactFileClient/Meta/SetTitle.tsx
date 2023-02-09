import { useEffect } from "react";
import { ApplicationName } from "../../Manifest";

export function SetTitle(props: {
    readonly title: string;
}): JSX.Element {
    const title = props.title;
    useEffect(() => {
        const newTitle = `${title} - ${ApplicationName}`;
        console.info(`Changing title to '${newTitle}'.`);
        document.title = newTitle;
    }, [title]);
    return <></>;
}
