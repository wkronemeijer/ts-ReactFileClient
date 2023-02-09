import { Component, PropsWithChildren } from "react";
import { assert } from "../../(System)/Assert";

type ErrorBoundaryProps = PropsWithChildren<{}>;
type ErrorBoundaryState = {
    error: Error | undefined;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: undefined };
    }
    
    static getDerivedStateFromError(error: unknown): Partial<ErrorBoundaryState> {
        assert(error instanceof Error, `Throw a proper error next time.`);
        // Update state so the next render will show the fallback UI.
        return { error };
    }
    
    componentDidCatch(_error: unknown, _errorInfo: unknown) {
        // You can also log the error to an error reporting service
        // React already logs the stack, so we don't have to.
    }
    
    render() {
        const { children } = this.props;
        const {    error } = this.state;
        
        if (error) {
            // You can render any custom fallback UI
            return <div className={ErrorBoundary.name}>
                <h1 className=  "Title">An ${error.name} has occured.</h1>
                <p  className="Message">{error.toString()}</p>
            </div>;
        }
        
        return children;
    }
}
  