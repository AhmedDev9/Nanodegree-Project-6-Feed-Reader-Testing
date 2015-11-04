/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of the tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is the first test suite 'RSS Feeds' - it is all about the
     * RSS feeds definitions, the allFeeds variable in the application.
     */
    describe('RSS Feeds', function() {
        /* This is the first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */

        // tests if the variable 'allFeeds' is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // loops through all elements of the 'allFeeds' array
        // and tests if every element (Feed) has an defined
        // attribute 'url' which is not empty

        function checkUrl(feed) {
            it('Feed: ' + feed.name + ' has an url', function() {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toEqual('');
            });
        }

        for(var x = 0; x < allFeeds.length; x++) {
            checkUrl(allFeeds[x]);
        };

        // loops through all elements of the 'allFeeds' array
        // and tests if every element (Feed) has an defined
        // attribute 'name' which is not empty

        function checkName(num,feed) {
            it('Feed ' + ++num + ' has a name: ' + feed.name, function() {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toEqual('');
            });
        }

        for(var x = 0; x < allFeeds.length; x++) {
            checkName(x,allFeeds[x]);
        };

    });


    /* This is the second test suite 'The menu' - it makes sure that
     * the menu is hidden per default and toggles its visibility
     * when the menu icon is clicked
     */
    describe('The menu', function() {

        // this function is called once before all the specs are run
        // to define 'menu' in order to call the click function on it
        // and a spy on 'menu' to track its call and class changes which
        // toggles the visibility of the menu
        beforeAll(function () {
            menu = $('.menu-icon-link');
            spy = spyOn(menu, 'click').and.callThrough();
        });

        // tests if the menu is hidden per default, which is true
        // when the 'body' element has a class 'menu-hidden'
        it('is hidden per default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // tests if the menu shows when the menu icon is clicked, which
        // is true when the spy tracked a click on the menu icon and the
        // the 'body' element does not have a class 'menu-hidden'
        it ('shows when the menu icon is clicked', function () {
            menu.click();
            expect(spy).toHaveBeenCalled();
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });

        // tests if the menu hides when the menu icon is clicked again,
        // which is true when the spy tracked a click on the menu icon
        // and the 'body' element has a class 'menu-hidden'
        it ('hides when the menu icon is clicked again', function () {
            menu.click();
            expect(spy).toHaveBeenCalled();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    /* This is the third test suite 'Initial Entries' - it ensures
     * when the loadFeed function is called and completes its work, there
     * is at least a single .entry element within the .feed container.
     */
    describe('Initial Entries', function() {

        // loops through all elements of the 'allFeeds' array and tests if
        // every element (Feed) could be loaded and has at least one feed entry

        beforeEach(function(done) {
            loadFeed(id, done);
        });

        function checkFeed(x) {
            id = x;
            var feedName = allFeeds[id].name;
            it('for feed: "' + feedName + '" has at least one entry', function() {
                expect($(".feed .entry").html()).not.toBe(null);
            });
        }

        for(var x = 0; x < allFeeds.length; x++) {
            checkFeed(x);
        };

    });

    /* This is the fourth test suite 'New Feed Selection' - it ensures
     * when a new feed is loaded by the loadFeed function that the
     * content actually changes.
     */
    describe('New Feed Selection', function() {

        // loads the first and second Feed and compares their contents
        // to test if a new Feed selection changes the Feed content

        var feedEntries;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feedEntries = $(".feed .entry").html();
                loadFeed(1, done);
            });
        });

        it('changes its content', function() {
            expect($(".feed .entry").html()).not.toMatch(feedEntries);
        });

    });

}());
