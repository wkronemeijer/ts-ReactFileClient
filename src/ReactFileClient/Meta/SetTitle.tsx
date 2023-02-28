import { memo, useEffect } from "react";
import { ApplicationName } from "../../Manifest";

export const SetTitle = memo(function setTitle(props: {
    readonly title: string;
}): JSX.Element {
    const { title } = props;
    
    useEffect(() => {
        const newTitle = `${title} - ${ApplicationName}`;
        const currentTitle = document.title;
        
        if (newTitle !== currentTitle) {
            console.info(`Changing title to '${newTitle}'.`);
            document.title = newTitle;
        }
    }, [title]);
    return <></>;
});
