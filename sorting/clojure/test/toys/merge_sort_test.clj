(ns ^{:doc "Tests."
      :author "Paul Evans"}
  toys.merge-sort-test
  (:use clojure.test clojure.core)
  (:use [toys.merge-sort :only [merge-sort]]))

(deftest test-merge-sort
  (is (= '(a b c) (merge-sort '(b c a)))))