import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

type State = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <div>
                        <div>⚠️</div>
                        <h1>Something went wrong</h1>
                        <p>
                            We're sorry for the inconvenience. Please try refreshing the page or go back to the home page.
                        </p>
                        <div>
                            <button
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                            >
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
} 