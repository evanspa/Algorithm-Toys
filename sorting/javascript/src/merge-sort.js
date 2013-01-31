/**
 * Merges 2 lists (implementation is iterative).
 */
function merge_iterative(left, right) {
    var result;
    var leftIndex, rightIndex;
    var resultIndex;

    leftIndex = 0;
    rightIndex = 0;
    resultIndex = 0;
    result = new Array(left.length + right.length);
    while ((leftIndex < left.length) || (rightIndex < right.length)) {
        if ((leftIndex < left.length) && (rightIndex < right.length)) {
            if (left[leftIndex] < right[rightIndex]) {
                result[resultIndex] = left[leftIndex];
                leftIndex++;                
            } else {
                result[resultIndex] = right[rightIndex];
                rightIndex++;
            }            
        } else if (leftIndex < left.length) {
            result[resultIndex] = left[leftIndex];
            leftIndex++;
        } else {
            result[resultIndex] = right[rightIndex];
            rightIndex++;
        }
        resultIndex++;
    }
    return result;
}

/**
 * Merge sort function (implementation is iterative).
 */
function mergeSort_iterative(list) {
    var blocklen;
    var merged;
    var lowerBoundOfRight;
    var upperBoundOfLeft, upperBoundOfRight;
    var left, right;

    blocklen = 1;
    if (list.length > 1) {
        while (blocklen < list.length) {
            for (var i = 0; (i+blocklen+1 <= list.length); i += (2*blocklen)) {

                if ((i + blocklen) > list.length) {
                    upperBoundOfLeft = list.length;
                    lowerBoundOfRight = list.length;
                    upperBoundOfRight = list.length;
                } else {
                    upperBoundOfLeft = i + blocklen;
                    lowerBoundOfRight = upperBoundOfLeft;
                    upperBoundOfRight = i + (2 * blocklen);
                    if (upperBoundOfRight > list.length) {
                        upperBoundOfRight = list.length;
                    }
                }
                left = subArray(list, i, upperBoundOfLeft);
                right = subArray(list, lowerBoundOfRight, upperBoundOfRight);
                merged = merge_iterative(left, right);
                for (var j = 0; j < merged.length; j++) {
                    list[i+j] = merged[j];
                }
            }
            blocklen *= 2;
        }
    }
}

/**
 * Returns an array that is a sub-array of a bounded by fromIndex (inclusive) and
 * toIndex (exclusive).
 */
function subArray(a, fromIndex, toIndex) {    
    var subA = new Array(toIndex - fromIndex);
    var index = 0;
    for (var i = fromIndex; i < toIndex; i++) {
        subA[index] = a[i];
        index++;
    }
    return subA;
}

/**
 * Returns the first element of a.
 */
function arrayHead(a) {
    return a[0];
}

/**
 * Returns an array that is the rest of a (a, but with its head stripped off).
 */
function restOfArray(a) {
    var newArray = new Array(a.length - 1);
    for (var i = 1; i < a.length; i++) {
        newArray[i-1] = a[i];
    }
    return newArray;
}