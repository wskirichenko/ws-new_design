(() => {
	const routes = {},
	defaultRoute = 'home';

	 routes['home'] = {
		url: '#/home',
		templateUrl: '../pages/home.html'
	 };

	 routes['projects'] = {
		url: '#/projects',
		templateUrl: '../pages/projects.html'
	 };

	 routes['service'] = {
		url: '#/service',
		templateUrl: '../pages/service.html'
	 };

	 routes['company'] = {
		url: '#/company',
		templateUrl: '../pages/company.html'
	 };

	 routes['blog'] = {
		url: '#/blog',
		templateUrl: '../pages/blog.html'
	 };

	//  routes['at'] = {
	// 	url: '#/at',
	// 	templateUrl: '../../pages/at.html'
	//  };

	 //--------------------
	//  routes['tab_2'] = {
	// 	url: '#/tab_2',
	// 	templateUrl: '../../pages/tab_second.html'
	//  };

	$.router
		.setData(routes)
		.setDefault(defaultRoute);

	$.when($.ready)
		.then(() => {
			$.router.run('.builder-content','projects','home','service','company','blog');
			// $.router.run('.tab-content','tab_2');
		})
})();
