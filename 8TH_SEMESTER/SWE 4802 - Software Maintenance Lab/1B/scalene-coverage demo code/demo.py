import numpy as np

def slow_python_loop(n):
    total = 0
    for i in range(n):
        total += i * i
    return total

def fast_numpy(n):
    arr = np.arange(n)
    return np.sum(arr * arr)

def memory_hog():
    big_list = [i for i in range(1_000_000)]
    return sum(big_list)

def main():
    print("Running slow loop...")
    slow_python_loop(5_000_000)   # 10x bigger

    print("Running numpy version...")
    for _ in range(100):          # repeat to make it measurable
        fast_numpy(1_000_000)

    print("Running memory hog...")
    for _ in range(10):
        memory_hog()

if __name__ == "__main__":
    main()