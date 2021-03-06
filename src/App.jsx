import React, {useState, useMemo} from 'react'
import { Switch, Route } from 'react-router-dom'
import { UserContext } from './hooks/useContext/UserContext';
import { PermissionContext } from './hooks/useContext/PermissionContext';
import { adminRoutes, globalPublicRoutes, RenderRoutes } from './routes/routes'
const MainLayout = React.lazy(() => import('./views/layouts/MainLayout'));
const AuthLayout = React.lazy(() => import('./views/layouts/AuthLayout'));
const NotFound = React.lazy(() => import('./views/errors/NotFound'));

const App = () => 
{
    const [userPermissions, setUserPermissions] = useState([]);
	const [authenticatedUser, setAuthenticatedUser] = useState({
		name: '',
		email: ''
	});
    
    const providerUser = useMemo(() => ({ authenticatedUser, setAuthenticatedUser }), 
        [authenticatedUser, setAuthenticatedUser]);

    const providerUserPermissions = useMemo(() => ({ userPermissions, setUserPermissions }), 
        [userPermissions, setUserPermissions]);



	return (
		<> 
			<Switch>

				<Route path='/auth/login' exact>
					<AuthLayout>
						<UserContext.Provider value={providerUser}>
							<PermissionContext.Provider value={providerUserPermissions}>
								<RenderRoutes routes={globalPublicRoutes.loginRoute} />
							</PermissionContext.Provider>
						</UserContext.Provider>
					</AuthLayout>
				</Route>

				<Route path='/auth/register' exact>
					<AuthLayout>
						<PermissionContext.Provider value={providerUserPermissions}>
							<RenderRoutes routes={globalPublicRoutes.registerRoute} />
						</PermissionContext.Provider>
					</AuthLayout>
				</Route>

				<Route path='/forgot-password/:path?' exact>
					<AuthLayout>
						<RenderRoutes routes={globalPublicRoutes.forgotPasswordRoute} />
					</AuthLayout>
				</Route>

				<Route path='/:path?' exact={false}>
					<UserContext.Provider value={providerUser}> 
						<PermissionContext.Provider value={providerUserPermissions}>
							<MainLayout>
								<RenderRoutes routes={adminRoutes.privateRoutes}/>
							</MainLayout>
						</PermissionContext.Provider>
					</UserContext.Provider>
				</Route>

				<Route component={NotFound} />
			</Switch>
		</> 
	)

}

export default React.memo(App);
