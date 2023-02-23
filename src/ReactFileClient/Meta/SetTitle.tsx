import { memo, useEffect } from "react";
import { ApplicationName } from "../../Manifest";

export const SetTitle = memo((props: {
    readonly title: string;
}): JSX.Element => {
    const { title } = props;
    useEffect(() => {
        const newTitle = `${title} - ${ApplicationName}`;
        console.info(`Changing title to '${newTitle}'.`);
        document.title = newTitle;
    }, [title]);
    return <></>;
});
