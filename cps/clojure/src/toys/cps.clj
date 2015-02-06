(ns ^{:doc "Playing with continuation-passing style."
      :author "Paul Evans"}
  toys.cps)

(defn fib-recursive [x]
  (if (< x 2)
    x
    (+ (fib-recursive (- x 1))
       (fib-recursive (- x 2)))))

(defn fib-cps-notramp [x]
  (letfn [(fib-cps-int [x k]
            (if (< x 2)
              (k x)
              (recur (- x 1)
                     (fn [fib-n-1]
                       (fib-cps-int
                        (- x 2)
                        (fn [fib-n-2]
                          (k (+ fib-n-1 fib-n-2))))))))]
    (fib-cps-int x (fn [fib] fib))))

(defn fib-cps-tramp [x]
  (letfn [(fib-cps-int [x k]
            (if (< x 2)
              (trampoline #(k x))
              (recur (- x 1)
                     (fn [fib-n-1]
                       #(fib-cps-int
                         (- x 2)
                         (fn [fib-n-2]
                           (k (+ fib-n-1 fib-n-2))))))))]
    (fib-cps-int x (fn [fib] fib))))
