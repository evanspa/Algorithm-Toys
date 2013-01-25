(ns
    ^{:doc "Implementation of merge sort algorithm."
      :author "Paul Evans"}
    toys.merge-sort)

(defn merge-recursive
  "Implementation of merge that yields a recursive process.  I.e., this version
cannot leverage recur because the resursive call is not in the tail position.
FYI, in the SICP lectures, Sussman contrasts 2 different implementations of the
same function; one was defined with an iterative strategy; the other with a
recursive strategy.  The same is true here.  This version happens to be the
recursive strategy."
  [left right]
  (let [left-count (count left)
        right-count (count right)
        left-first (first left)
        right-first (first right)]
    (if (and (= left-count 0)
             (= right-count 0))
      []
      (if (and (> left-count 0)
               (> right-count 0))
        (if (<= left-first right-first)
          (cons left-first (merge-recursive (rest left) right))
          (cons right-first (merge-recursive left (rest right))))
        (if (> left-count 0)
          (cons left-first (merge-recursive (rest left) right))
          (cons right-first (merge-recursive left (rest right))))))))

(defn merge-iterative
  "Implementation of merge that yeilds an iterative process.  I.e., all the
information necessary to carry out the computation is parameterized within
the internal merge-iterative-internal procedure. Because of this, the recursive
calls are naturally in the tail position, and thus allows the usage of recur."
  [left right]
  (letfn [(merge-iterative-internal [left right result]
            (let [left-count (count left)
                  right-count (count right)
                  left-first (first left)
                  right-first (first right)]
              (if (and (= left-count 0)
                       (= right-count 0))
                result
                (if (and (> left-count 0)
                         (> right-count 0))
                  (if (<= left-first right-first)
                    (recur (rest left) right (conj result left-first))
                    (recur left (rest right) (conj result right-first)))
                  (if (> left-count 0)
                    (recur (rest left) right (conj result left-first))
                    (recur left (rest right) (conj result right-first)))))))]
    (merge-iterative-internal left right [])))

(defn merge-sort
  "Sorts the given list using merge sort algorithm.  Because merge-serge is
doubly recusive, it is not possible to yield a purely iterative process; it
is not possible to use recur.  Therefore, in order to prevent stack growth,
the trampoline technique is leveraged."
  [l]
  (letfn [(merge-sort-tramp [l]
            (if (or (nil? l)
                    (= (count l) 0)
                    (= (count l) 1))
              l
              (let [count-halved (int (/ (count l) 2))
                    left (take count-halved l)
                    right (nthrest l count-halved)]
                (merge-iterative (trampoline #(merge-sort-tramp left))
                                 (trampoline #(merge-sort-tramp right))))))]
    (trampoline #(merge-sort-tramp l))))
