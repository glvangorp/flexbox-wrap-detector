angular
    .module('flexbox-wrap-detector-app', [])
    .directive('flexboxWrapDetector', flexboxWrapDetector);

function flexboxWrapDetector() {
    var ddo = {
        restrict: 'A',
        scope: true,
        link: function postLink(scope, element) {
            
            // check for the wrapped elements after compilation
            wrapped();

            // check on every window resize
            $(window).resize(wrapped);

            function wrapped() {
                
                var topRowOffset;
                var prevTop;
                var currentRow = 0;
                var wrappedRegex = /wrapped-\d*/i;

                $('[flexbox-wrap-detector] > .flex-child').each(function() {

                    var top = $(this).offset().top;

                    // This checks if the current object has a class that begins with 'wrapped-'
                    // remove the old wrapped class if it exists                    
                    if(wrappedRegex.exec($(this)[0].classList)) {
                        $(this)[0].className = $(this)[0].className.replace(wrappedRegex, '').trim();
                    }

                    if(topRowOffset === undefined) {
                        topRowOffset = top;
                        prevTop = top;
                        return true;
                    }

                    // don't process first row
                    if (top !== topRowOffset) {

                        // we just hit a new line
                        if (top !== prevTop) {
                            currentRow += 1;
                        }
                        
                        // add the wrapped class
                        $(this).addClass('wrapped-' + currentRow);
                        prevTop = top;
                    }

                });
            }
        }
    };

    return ddo;

}