document.querySelectorAll(".muscle-groups svg g g[id]").forEach(function(group) {
    
    
    // For the hover
    group.addEventListener('mouseover', function(el) {
        let id = el.path[1].id.toLowerCase()
        if(!id) id = el.path[2].id.toLowerCase()
        let label = document.querySelectorAll("label[for=" + id + "]")[0]
        if (label.classList)
            label.classList.add("hover")
        else
            label.className += ' ' + "hover"
    })
    group.addEventListener('mouseout', function(el) {
        let id = el.path[1].id.toLowerCase()
        if(!id) id = el.path[2].id.toLowerCase()
        let label = document.querySelectorAll("label[for=" + id + "]")[0]
        let clss = "hover"
        if (label.classList)
            label.classList.remove(clss)
        else
            label.className = label.className.replace(new RegExp('(^|\\b)' + clss.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    })
    // For the click
    group.addEventListener('click', function(el) {
        let id = el.path[1].id.toLowerCase()
        if(!id) id = el.path[2].id.toLowerCase()
        let input = document.getElementById(id)
        if(input.checked) input.checked = false
        else input.checked = true
    });
});

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        // Check if the current page is log.html
        if (window.location.pathname.includes('dayselect.html')) {
            const addButton = document.querySelector('.add');
            const homeOptionsContainer = document.querySelector('.main');
            const firstButton = document.querySelector('.buttons');

            let dayCount = parseInt(localStorage.getItem('dayCount')) || 3;

            // Function to load existing days from localStorage
            function loadExistingDays() {
                for (let i = 1; i <= dayCount; i++) {
                    const dayOption = createDayOption(i);
                    homeOptionsContainer.insertBefore(dayOption, firstButton);
                }
            }

            // Load existing days from localStorage when the page loads
            loadExistingDays();

            for (let i = 1; i <= dayCount; i++) {
                loadTablesForDay(i); // Load tables for each day
            }

            function createDayOption(dayNumber) {
                const dayOption = document.createElement('a');
                dayOption.href = 'weightlog.html';
                dayOption.classList.add('home-options');
                dayOption.textContent = 'Day ' + dayNumber;

                // Add contextmenu (right-click) event listener
                dayOption.addEventListener('contextmenu', function (event) {
                    event.preventDefault(); // Prevent the default context menu

                    // Change color to red
                    dayOption.style.color = 'red';

                    // Display confirmation popup
                    const confirmRemove = window.confirm('Do you want to remove this day?');

                    // If user clicks OK, remove the day
                    if (confirmRemove) {
                        homeOptionsContainer.removeChild(dayOption);

                        // Update the dayCount
                        dayCount--;
                        localStorage.setItem('dayCount', dayCount.toString());
                    } else {
                        // If user clicks Cancel, revert the color
                        dayOption.style.color = ''; // Revert to the original color
                    }
                });

                // Add click event listener to store the selected day in localStorage
                dayOption.addEventListener('click', function () {
                    localStorage.setItem('selectedDay', dayNumber);
                    loadTablesForDay(dayNumber); // Load tables for the selected day
                });

                return dayOption;
            }

            function addDayOption() {
                dayCount++;
                const newDayOption = createDayOption(dayCount);

                // Insert the new day option before the first button
                homeOptionsContainer.insertBefore(newDayOption, firstButton);

                // Save the updated dayCount to localStorage
                localStorage.setItem('dayCount', dayCount.toString());
            }

            addButton.addEventListener('click', addDayOption);

            // function to get URL parameters

        }
        if (window.location.pathname.includes('weightlog.html')) {
            // Get the selected day from localStorage
            const selectedDay = localStorage.getItem('selectedDay');

            // Check if selectedDay is not null
            if (selectedDay !== null) {
                // Set the heading based on the selected day
                const logHeading = document.getElementById('log-heading');
                if (logHeading) {
                    logHeading.textContent = 'Day ' + selectedDay;
                }
            }

            const editWorkoutIcon = document.querySelector('.bx.bxs-pencil.bx-sm');
            const workoutHeading = document.getElementById('workout-heading');

            // Add click event listener to the pencil icon
            if (editWorkoutIcon && workoutHeading) {
                editWorkoutIcon.addEventListener('click', function () {
                    // Toggle the contenteditable attribute
                    workoutHeading.contentEditable = workoutHeading.contentEditable === 'false' ? 'true' : 'false';

                    if (workoutHeading.contentEditable === 'false') {
                        // Save the edited workout heading to local storage when contenteditable is set to false
                        localStorage.setItem('editedWorkoutHeading', workoutHeading.innerText);
                        console.log('Saved:', localStorage.getItem('editedWorkoutHeading'));
                    }
                });
            }

            // Load edited workout heading from localStorage when the page loads
            const savedWorkoutHeading = localStorage.getItem('editedWorkoutHeading');
            if (savedWorkoutHeading) {
                workoutHeading.innerText = savedWorkoutHeading;
            }

            if (window.location.pathname.includes('weightlog.html')) {
                const addButton = document.getElementById('new-table');
                const firstTable = document.querySelector('.workout-table');
                const homeOptionsContainer = document.querySelector('.main');
                let weekCount = parseInt(localStorage.getItem('weekCount')) || 2; 

                function createWeekTable(weekNumber) {
                    const newTable = document.createElement('table');
                    newTable.classList.add('workout-table');

                    const headerRow = document.createElement('tr');
                    const headerCell = document.createElement('th');
                    headerCell.classList.add('tbhead');
                    headerCell.setAttribute('colspan', '9');
                    headerCell.textContent = 'Week ' + weekNumber;
                    headerRow.appendChild(headerCell);

                    const setHeaderRow = document.createElement('tr');
                    setHeaderRow.innerHTML = `
                        <th></th>
                        <th colspan="2">Set 1</th>
                        <th colspan="2">Set 2</th>
                        <th colspan="2">Set 3</th>
                        <th colspan="2">Set 4</th>
                    `;

                    const exerciseHeaderRow = document.createElement('tr');
                    exerciseHeaderRow.innerHTML = `
                        <th>Exercise</th>
                        <td class="wreps">Weight</td>
                        <td class="wreps">Reps</td>
                        <td class="wreps">Weight</td>
                        <td class="wreps">Reps</td>
                        <td class="wreps">Weight</td>
                        <td class="wreps">Reps</td>
                        <td class="wreps">Weight</td>
                        <td class="wreps">Reps</td>
                    `;

                    newTable.appendChild(headerRow);
                    newTable.appendChild(setHeaderRow);
                    newTable.appendChild(exerciseHeaderRow);

                    const sampleExerciseRow = document.createElement('tr');
                    sampleExerciseRow.innerHTML = `
                        <th class="exercise" contenteditable="true">New Exercise</th>
                        <td class="weight-set1" contenteditable="true"></td>
                        <td class="reps-set1" contenteditable="true"></td>
                        <td class="weight-set2" contenteditable="true"></td>
                        <td class="reps-set2" contenteditable="true"></td>
                        <td class="weight-set3" contenteditable="true"></td>
                        <td class="reps-set3" contenteditable="true"></td>
                        <td class="weight-set4" contenteditable="true"></td>
                        <td class="reps-set4" contenteditable="true"></td>
                    `;
                    newTable.appendChild(sampleExerciseRow);

                    return newTable;
                }

                function addWeekTable() {
                    weekCount++;
                    const newWeekTable = createWeekTable(weekCount);
                
                    // Insert the new table after the last table
                    homeOptionsContainer.insertBefore(newWeekTable, firstTable.nextSibling);
                
                    // Save the updated weekCount to localStorage
                    localStorage.setItem('weekCount', weekCount.toString());
                
                    saveTableToLocalStorage(newWeekTable, selectedDay, weekCount);
                
                }

                function loadTablesForDay(dayNumber) {
                    for (let i = 1; i <= weekCount; i++) {
                        const tableKey = getTableKey(dayNumber, i);
                        const rowDataJson = localStorage.getItem(tableKey);
                
                        if (rowDataJson) {
                            const rowData = JSON.parse(rowDataJson);
                            const newTable = createWeekTable(i);
                
                            // Set the row values in the loaded table
                            const rows = newTable.querySelectorAll('.workout-table tbody tr');
                            rowData.forEach((values, rowIndex) => {
                                const cells = rows[rowIndex].querySelectorAll('[contenteditable="true"]');
                                values.forEach((value, cellIndex) => {
                                    cells[cellIndex].innerText = value;
                                });
                            });
                
                            // Append the table to the DOM
                            homeOptionsContainer.insertBefore(newTable, firstButton.nextSibling);
                        }
                    }
                }

                function getTableKey(dayNumber, weekNumber) {
                    return 'table_day' + dayNumber + '_week' + weekNumber;
                }

                function saveTableToLocalStorage(table, dayNumber, weekNumber) {
                    const tableKey = getTableKey(dayNumber, weekNumber);
                    const rows = table.querySelectorAll('.workout-table tbody tr');
                    const rowData = Array.from(rows).map(row => {
                        const cells = row.querySelectorAll('[contenteditable="true"]');
                        return Array.from(cells).map(cell => cell.innerText);
                    });
                    localStorage.setItem(tableKey, JSON.stringify(rowData));
                }

                addButton.addEventListener('click', addWeekTable);
                loadTablesForDay(selectedDay); // Load tables for the selected day
            }

            const cells = document.querySelectorAll('.workout-table [contenteditable="true"]');

            cells.forEach(function (cell, index) {
                const key = 'cell_' + selectedDay + '_' + index;

                function loadContent() {
                    // Load content from local storage when the page loads
                    const savedContent = localStorage.getItem(key);
                    if (savedContent) {
                        cell.innerText = savedContent;
                    }
                }

                // Load content when the page loads
                loadContent();

                cell.addEventListener('input', function () {
                    // Save the edited content to local storage
                    localStorage.setItem(key, cell.innerText);
                    console.log('Saved Cell Content:', localStorage.getItem(key));
                });
            });
        }
    }, 0);
});
