/**
 * Inserts value into given sorted list, preserving sortedness.
 */
function insert(value, list) {
    var newList;
    var loop;
    var innerLoop;
    var valAdded;
    if (list == null || list.length == 0) {
        return [value];
    } else if (list.length == 1) {
        if (value >= list[0]) {
            return [list[0], value];
        } else {
            return [value, list[0]];
        }
    } else {
        valAdded = false;
        newList = new Array(list.length + 1);
        for (loop = 0; loop < list.length && !valAdded; loop++) {
            if (value < list[loop]) {
                newList[loop] = value;
                for (innerLoop = loop; innerLoop < list.length; innerLoop++) {                    
                    newList[innerLoop + 1] = list[innerLoop];
                }
                valAdded = true;
            } else {
                newList[loop] = list[loop];
            }
        }
        if (!valAdded) {
            newList[list.length] = value;
        }
        return newList;
    }
}

function insertionSort(list) {
    var sortedList;
    var value;
    var loopCounter;
    if (list == null || list.count === 0 || list.count === 1) {
        return list;
    } else {
        sortedList = [];
        sortedList[0] = list[0];
        loopCounter = 1;
        while (loopCounter < list.length) {
            value = list[loopCounter];
            sortedList = insert(value, sortedList);
            loopCounter++;
        }
        return sortedList;
    }
}