import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div>
            <div>
                <div>404</div>
                <h1>Page Not Found</h1>
                <p>
                    The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                </p>
                <div>
                    <Link to="/">
                        Go to Homepage
                    </Link>
                    <Link to="/">
                        Browse Products
                    </Link>
                </div>
            </div>
        </div>
    );
} 