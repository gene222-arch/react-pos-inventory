import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { adminRoutes, managerRoutes, cashierRoutes, globalRoutes, RenderRoutes } from './routes/routes'
const MainLayout = React.lazy(() => import('./views/layouts/MainLayout'));
const AuthLayout = React.lazy(() => import('./views/layouts/AuthLayout'));
const NotFound = React.lazy(() => import('./views/errors/NotFound'));

const App = () => 
{
	return (
		<> 
			<Switch>
				<Route path='/auth/login' exact>
					<AuthLayout>
						<RenderRoutes routes={globalRoutes} />
					</AuthLayout>
				</Route>

				<Route path='/admin/auth/register' exact>
					<AuthLayout>
						<RenderRoutes routes={adminRoutes.publicRoutes} />
					</AuthLayout>
				</Route>

				<Route path='/manager/auth/register' exact>
					<AuthLayout>
						<RenderRoutes routes={managerRoutes.publicRoutes} />
					</AuthLayout>
				</Route>

				<Route path='/auth/register' exact>
					<AuthLayout>
						<RenderRoutes routes={cashierRoutes.publicRoutes} />
					</AuthLayout>
				</Route>

				<Route path='/:path?' exact={false}>
					<MainLayout>
						<RenderRoutes routes={adminRoutes.privateRoutes}/>
					</MainLayout>
				</Route>

				<Route component={NotFound} />
			</Switch>
		</> 
	)

}

export default React.memo(App);
