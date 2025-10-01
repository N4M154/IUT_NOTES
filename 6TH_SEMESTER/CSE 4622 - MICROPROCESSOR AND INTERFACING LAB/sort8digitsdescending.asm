.model small
.stack 100h

.data
    prompt db 'Input: $'
    output db 13,10,'Output: $'
    input_buffer db 9 dup(?)      ; 8 digits + carriage return
    array db 8 dup(?)            ; Array to store digits
    space db ' $'

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
    
    ; Bubble sort in descending order
    mov cx, 7            ; Outer loop counter (n-1)
outer_loop:
    mov bx, cx           ; Inner loop counter
    mov si, offset array
    
inner_loop:
    mov al, [si]         ; Compare current and next element
    mov dl, [si+1]
    cmp al, dl
    jge no_swap          ; If already in order, skip swap
    
    ; Swap elements
    mov [si], dl
    mov [si+1], al
    
no_swap:
    inc si
    dec bx
    jnz inner_loop
    
    loop outer_loop
    
    ; Display output
    mov ah, 09h
    lea dx, output
    int 21h
    
    ; Display sorted array
    mov cx, 8
    mov si, offset array
display_loop:
    mov dl, [si]
    add dl, 30h          ; Convert number to ASCII
    mov ah, 02h          ; Display character function
    int 21h
    
    ; Display space between numbers
    mov ah, 09h
    lea dx, space
    int 21h
    
    inc si
    loop display_loop
    
    ; Exit program
    mov ah, 4Ch
    int 21h
    
main endp
end main