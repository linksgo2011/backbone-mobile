
/**
 * The application entry point
 */

define(['app-router'], function(AppRouter) {

    function initialize() {
        var appRouter = new AppRouter({
            //options here
        });
        appRouter.start();
    }

    return {
        initialize: initialize
    };
});