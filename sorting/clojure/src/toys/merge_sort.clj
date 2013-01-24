(ns
    ^{:doc "Implementation of merge sort algorithm."
      :author "Paul Evans"}
    toys.merge-sort)

(defn merge-sort-tramp
  "Sorts the given list using merge sort algorithm."
  [l]
  (if (or (nil? l)
          (= (count l) 0)
          (= (count l) 1))
    l
    (letfn [(merge-cps [left right k]
              (let [left-count (count left)
                    right-count (count right)
                    left-first (first left)
                    right-first (first right)]
                (if (or (> left-count 0)
                        (> right-count 0))
                  (if (and (> left-count 0)
                           (> right-count 0))
                    (if (<= left-first right-first)
                      (trampoline
                       #(merge-cps
                         (rest left)
                         right
                         (fn [v] (conj v left-first))))
                      (trampoline
                       #(merge-cps
                         left
                         (rest right)
                         (fn [v] (conj v right-first))))))
                  (if (> left-count 0)
                    (trampoline
                     #(merge-cps
                       (rest left)
                       right
                       (fn [v] (conj v left-first))))
                    (when (> right-count 0)
                      (trampoline
                       #(merge-cps
                         left
                         (rest right)
                         (fn [v] (conj v right-first)))))))
                (k (vec '()))))]
      (let [count-halved (int (/ (count l) 2))
            left (take count-halved l)
            right (nthrest l count-halved)]
        (merge-cps (trampoline #(merge-sort left))
                   (trampoline #(merge-sort right))
                   (fn [v] v))))))

(defn merge-sort
  "Sorts the given list using merge sort algorithm."
  [l]
  (if (or (nil? l)
          (= (count l) 0)
          (= (count l) 1))
    l
    (letfn [(merge [left right result]
              (let [left-count (count left)
                    right-count (count right)
                    left-first (first left)
                    right-first (first right)]
                (if (or (> left-count 0)
                        (> right-count 0))
                  (if (and (> left-count 0)
                           (> right-count 0))
                    (if (<= left-first right-first)
                      (merge (rest left) right (conj result left-first))
                      (merge left (rest right) (conj result right-first))))
                  (if (> left-count 0)
                    (merge (rest left) right (conj result left-first))
                    (when (> right-count 0)
                      (merge left (rest right) (conj result right-first)))))
                result))]
      (let [count-halved (int (/ (count l) 2))
            left (take count-halved l)
            right (nthrest l count-halved)]
        (merge (merge-sort left)
               (merge-sort right)
               (vector))))))