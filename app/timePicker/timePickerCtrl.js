app.controller('timePickerCtrl', function ($scope, serviceProvidersService, appointementService) {
    $scope.eventSources = [];
    $scope.availableHours = [];
    $scope.dt = new Date();
    let sp = serviceProvidersService.getSelectedProvider();

    /* config object */
    $scope.uiConfig = {
        calendar: {
            themeSystem: 'bootstrap4',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month'
            },
            eventLimit: true, // allow "more" link when too many events
            // events: 'https://fullcalendar.io/demo-events.json',
            //aspectRatio: 0.75,
            defaultView: 'month',
            allDaySlot: false,
            businessHours: {
                // days of week. an array of zero-based day of week integers (0=Sunday)
                dow: [0, 1, 2, 3, 4], // Sunday - Thursday

                // start: '09:00', // a start time (10am in this example)
                // end: '17:00', // an end time (6pm in this example)
                // start : dayStart,
                // end : dayEnd
            },
            selectable: true,
            selectHelper: true,
            dayClick: function (date, jsEvent, view) {
                $scope.dt = date.toDate();
                $scope.availableHours.clear();
                loadTimes(sp);
            }
        }
        // {
        //     height: 450,
        //     editable: true,
        //     selectable: true,
        //     selectHelper: true,
        //     eventLimit: true,
        //     header: {
        //         left: 'month,agendaWeek',
        //         center: 'prev,title,next',
        //         right: 'today prevYear,nextYear'
        //     },
        //     views: {
        //         week: { // name of view
        //             titleFormat: 'YYYY, MM, DD'
        //             // other view-specific options here
        //         }
        //     },
        //     eventClick: $scope.alertEventOnClick,
        //     eventDrop: $scope.alertOnDrop,
        //     eventResize: $scope.alertOnResize,
        //     dayClick: function (date, jsEvent, view) {
        //         console.log(date);
        //         $scope.dt = date.toDate();
        //     },
        //     themeSystem: 'bootstrap4',
        //     buttonIcons: {
        //         prev: 'left-single-arrow',
        //         next: 'right-single-arrow',
        //         prevYear: 'left-double-arrow',
        //         nextYear: 'right-double-arrow'
        //     }
        // }
    };

    function loadTimes(sp) {

        if (sp) {
            let occupiedTime = serviceProvidersService.loadOccupiedTime(sp.id, $scope.dt);

            let allHours = [];
            for (let i = 8; i < 18; i++) {
                let time = new Date($scope.dt);
                time.setSeconds(0);
                time.setMinutes(0);
                time.setHours(i);
                allHours.push({
                    date: time,
                    start: i,
                    end: i + 1,
                    available: true
                });
            }

            allHours.forEach(h => {

                for (let i = 0; i < occupiedTime.length; i++) {
                    if (occupiedTime[i].start == h.start) {
                        h.available = false;
                    }
                }

                $scope.availableHours.push(h);
            });
        }
    }

    $scope.selectTime = function (time) {
        time.available = false;
        appointementService.setTempTime(time);
        $scope.selectedDate = time.date;
    };

    loadTimes(sp);
});