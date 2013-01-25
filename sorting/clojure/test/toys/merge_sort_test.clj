(ns ^{:doc "Tests."
      :author "Paul Evans"}
  toys.merge-sort-test
  (:use clojure.test clojure.core)
  (:use [toys.merge-sort :only [merge-sort]]))

(deftest test-merge-sort
  (is (= '(1 2 3) (merge-sort '(3 1 2))))
  (is (= '(9 10 11 12 13) (merge-sort '(12 13 9 11 10)))))
