import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchSession } from '../api/auth';

/**
 * Route guard for the admin area.
 *
 * This asks the server who you are rather than trusting anything client-side —
 * a guard based on local state alone can be walked past by typing the URL. It is
 * a usability layer, not the security boundary: the real protection is
 * requireAuth on every mutating API route, which holds even if this is bypassed.
 */
const RequireAuth = ({ children }) => {
    const [state, setState] = useState({ status: 'checking', admin: null });
    const location = useLocation();

    useEffect(() => {
        let active = true;
        fetchSession()
            .then((admin) => {
                if (!active) return;
                setState({ status: admin ? 'authed' : 'anonymous', admin });
            })
            .catch(() => active && setState({ status: 'anonymous', admin: null }));
        return () => { active = false; };
    }, []);

    if (state.status === 'checking') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-gray-medium">Checking your session…</p>
                </div>
            </div>
        );
    }

    if (state.status === 'anonymous') {
        // `replace` keeps the protected URL out of history, so Back does not
        // bounce between the guard and the login page.
        return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
    }

    return children;
};

export default RequireAuth;
