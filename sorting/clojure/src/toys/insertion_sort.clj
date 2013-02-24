(ns
    ^{:doc "Implementation of insertion sort algorithm."
      :author "Paul Evans"}
    toys.insertion-sort)

(defn insert
  "Inserts value into sorted list.  Involves recursion yielding an iterative
process."
  [value list]
  (loop [list list
         newlist []]
    (if (empty? list)
      (vec (cons value newlist))
      (if (= (count list) 1)
        (if (< value (first list))
          (vec (cons value (vec (cons (first list) newlist))))
          (vec (conj (vec (cons (first list) newlist)) value)))
        (if (and (<= value (last list))
                 (> value (nth list (- (count list) 2))))
          (vec (concat (take (dec (count list)) list)
                       (cons value (cons (last list) newlist))))
          (if (> value (last list))
            (vec (conj list value))
            (recur (take (dec (count list)) list)
                   (cons (last list) newlist))))))))

(defn insertion-sort
  "Sorts list using insertion sort algorithm.  Involves recursion yielding
an interative process."
  [list]
  (if (or (empty? list)
          (= (count list) 1))
      list
      (loop [sorted-list (vector (first list))
             index 1]
        (if (= (count sorted-list) (count list))
          sorted-list
          (let [val (nth list index)]
            (recur (insert val sorted-list) (inc index)))))))