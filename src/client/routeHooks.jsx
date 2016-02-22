import auth from './auth.jsx';

export const requireAuth = (nextState, replace) => {
	if ( !auth.loggedIn() ) {
		replace({pathname: '/'});
	}
};

export const isLoggedIn = (nextState, replace) => {
	if ( auth.loggedIn() ) {
		replace({pathname: '/repos'});
	}
}
