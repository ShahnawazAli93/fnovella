module.exports = {
  path: 'app',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/dashboard'), // main app dashboard
        require('./routes/forms'), //  sample forms
        require('./routes/pageLayouts'), // simple page Layout
        require('./routes/pages'), // App core pages
        require('./routes/catalog'), // Calaps App catalog
        require('./routes/upload'), // Calaps App Users
        require('./routes/users'), // Calaps App Users
        require('./routes/program'), // Calaps App Program
        require('./routes/students'), // Calaps App Students
        require('./routes/teachers'), // Calaps App Students
        require('./routes/privileges'), // Calaps App Students
        require('./routes/locations'), // Calaps App Students
        require('./routes/grade'), // Calaps App Students
        require('./routes/workshop'), // Calaps App Students
        require('./routes/division'), // Calaps App Students
        require('./routes/activation'), // Calaps App Students
        require('./routes/category'), // Calaps App Category
        require('./routes/course'), // Calaps App Students
        require('./routes/group'), // Calaps App Students
        require('./routes/create_group'), // Calaps App Students
        require('./routes/section'), // Calaps App Students
        require('./routes/visualization'), // Calaps App Visualization
        require('./routes/inscription'), // Calaps App Inscription
      ]);
    });
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/MainApp'));
    });
  }
};
