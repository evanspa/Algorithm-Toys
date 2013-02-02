/**
 * Merges 2 lists (iterative recursive, with CPS implementation).
 */
function merge_recursive_iterative_cps(left, right) {
    function m_recur_itr_cps(left, right, result, k) {
        if (left.length == 0 && right.length == 0) {
            return k(result);
        } else if (left.length == 0) {
            return k(result.concat(right));
        } else if (right.length == 0) {
            return k(result.concat(left));
        } else {
            if (left[0] < right[0]) {
                return m_recur_itr_cps(restOfArray(left), right, result.concat(left[0]), k);
            } else {
                return m_recur_itr_cps(left, restOfArray(right), result.concat(right[0]), k);
            }
        }
    }
    return m_recur_itr_cps(left, right, [], function(x) {return x;});
}

/**
 * Merges 2 lists (iterative recursive implementation).
 */
function merge_recursive_iterative(left, right) {
    function m_recur_itr(left, right, result) {
        if (left.length == 0 && right.length == 0) {
            return result;
        } else if (left.length == 0) {
            return result.concat(right);
        } else if (right.length == 0) {
            return result.concat(left);
        } else {
            if (left[0] < right[0]) {
                return m_recur_itr(restOfArray(left), right, result.concat(left[0]));
            } else {
                return m_recur_itr(left, restOfArray(right), result.concat(right[0]));
            }
        }
    }
    return m_recur_itr(left, right, []);
}

/**
 * Merges 2 lists (recursive implementation).
 */
function merge_recursive(left, right) {
    if (left.length == 0 && right.length == 0) {
        return [];
    } else if (left.length == 0) {
        return right;
    } else if (right.length == 0) {
        return left;
    } else {
        if (left[0] < right[0]) {
            return new Array().concat(left[0]).concat(merge_recursive(restOfArray(left), right));
        } else {
            return new Array().concat(right[0]).concat(merge_recursive(left, restOfArray(right)));
        }
    }
}

/**
 * Merge sort (recursive implementation).
 */
function mergeSort_recursive(list) {
    var left, right;
    var leftUpperBound;
    var merged;
    if (list.length <= 1) {
        return list;
    } else {
        leftUpperBound = Math.floor(list.length / 2);
        left = subArray(list, 0, leftUpperBound);
        right = subArray(list, leftUpperBound, list.length);
        return merge_recursive(mergeSort_recursive(left),
                               mergeSort_recursive(right));
    }
}

/**
 * Merges 2 lists (iterative implementation).
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