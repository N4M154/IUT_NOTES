.model small
.stack 100h

.data
    prompt db 'Input: $'
    output db 13,10,'Prime Digits Ascending: $'
    array db 8 dup(?)            ; Original input array
    primes db 8 dup(?)           ; Array for prime numbers
    prime_count db 0             ; Count of prime numbers found
    space db ' $'
    no_primes db 13,10,'No prime numbers found!$'

.code
main proc
    mov ax, @data
    mov ds, ax
    
    ; Display input prompt
    mov ah, 09h
    lea dx, prompt
    int 21h
    
    ; Read 8 digits from keyboard
    mov cx, 8
    mov si, offset array
read_loop:
    mov ah, 01h          ; Read character function
    int 21h
    sub al, 30h          ; Convert ASCII to number
    mov [si], al         ; Store in array
    inc si
    
    ; Read and discard space (if any)
    mov ah, 01h
    int 21h
    
    loop read_loop
    
    ; Find prime numbers (2, 3, 5, 7)
    mov cx, 8
    mov si, offset array
    mov di, offset primes
find_primes:
    mov al, [si]
    
    ; Check if number is prime
    cmp al, 2
    je is_prime
    cmp al, 3
    je is_prime
    cmp al, 5
    je is_prime
    cmp al, 7
    je is_prime
    jmp not_prime
    
is_prime:
    mov [di], al         ; Store prime number
    inc di
    inc prime_count
    
not_prime:
    inc si
    loop find_primes
    
    ; Check if any primes were found
    cmp prime_count, 0
    je no_primes_found
    
    ; Bubble sort primes in ASCENDING order
    mov cl, prime_count
    dec cl               ; Outer loop counter (n-1)
    jz display_primes    ; If only one prime, no need to sort
    
outer_loop:
    mov ch, cl           ; Inner loop counter
    mov si, offset primes
    
inner_loop:
    mov al, [si]         ; Compare current and next element
    mov dl, [si+1]
    cmp al, dl
    jle no_swap          ; If already in ascending order, skip swap
    
    ; Swap elements for ascending order
    mov [si], dl
    mov [si+1], al
    
no_swap:
    inc si
    dec ch
    jnz inner_loop
    
    dec cl
    jnz outer_loop
    
    ; Display output
display_primes:
    mov ah, 09h
    lea dx, output
    int 21h
    
    ; Display sorted prime numbers in ascending order
    mov cl, prime_count
    mov ch, 0
    mov si, offset primes
    jcxz exit_program     ; Exit if no primes to display
    
display_loop:
    mov dl, [si]
    add dl, 30h          ; Convert number to ASCII
    mov ah, 02h          ; Display character function
    int 21h
    
    ; Display space between numbers (except last one)
    dec cx
    jz exit_program
    
    mov ah, 09h
    lea dx, space
    int 21h
    
    inc si
    jmp display_loop
    
no_primes_found:
    mov ah, 09h
    lea dx, no_primes
    int 21h
    
exit_program:
    ; Exit program
    mov ah, 4Ch
    int 21h
    
main endp
end main