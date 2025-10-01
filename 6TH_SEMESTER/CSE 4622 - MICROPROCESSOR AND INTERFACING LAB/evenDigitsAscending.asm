.model small
.stack 100h

.data
    input_msg db 'Enter 8 digits (0-9) separated by spaces: $'
    output_msg db 0dh, 0ah, 'Even Ascending: $'
    newline db 0dh, 0ah, '$'
    space db ' $'
    
    input_digits db 8 dup(?)     ; Array to store input digits
    even_digits db 8 dup(?)      ; Array to store even digits
    even_count db 0              ; Counter for even digits

.code
main proc
    mov ax, @data
    mov ds, ax
    
    ; Display input prompt
    lea dx, input_msg
    mov ah, 09h
    int 21h
    
    ; Read 8 digits from keyboard
    mov cx, 8                    ; Counter for 8 digits
    lea si, input_digits         ; Point to input array
    
read_digits:
    ; Read character
    mov ah, 01h
    int 21h
    
    ; Check if it's a digit (0-9)
    cmp al, '0'
    jb skip_char
    cmp al, '9'
    ja skip_char
    
    ; Store the digit
    mov [si], al
    inc si
    dec cx
    jz done_reading
    
    ; Skip spaces and other characters
    jmp read_digits
    
skip_char:
    cmp al, ' '                  ; Allow spaces
    je read_digits
    cmp al, 0dh                  ; Allow Enter key
    je read_digits
    cmp al, 0ah                  ; Allow Line feed
    je read_digits
    jmp read_digits

done_reading:
    ; Filter even digits
    mov cx, 8                    ; Number of input digits
    lea si, input_digits         ; Source array
    lea di, even_digits          ; Destination array
    mov even_count, 0
    
filter_even:
    mov al, [si]                 ; Get digit
    sub al, '0'                  ; Convert ASCII to number
    test al, 01h                 ; Check if even (LSB = 0)
    jnz not_even                 ; Jump if odd
    
    ; Store even digit
    add al, '0'                  ; Convert back to ASCII
    mov [di], al
    inc di
    inc even_count
    
not_even:
    inc si
    loop filter_even
    
    ; Sort even digits using bubble sort
    mov cl, even_count
    cmp cl, 0
    je display_result            ; No even digits to sort
    cmp cl, 1
    je display_result            ; Only one digit, already sorted
    
    dec cl                       ; Outer loop counter (n-1)
    
outer_loop:
    push cx                      ; Save outer counter
    lea si, even_digits          ; Reset to start of array
    mov ch, cl                   ; Inner loop counter
    
inner_loop:
    mov al, [si]                 ; Current element
    mov ah, [si+1]               ; Next element
    cmp al, ah
    jbe no_swap                  ; Jump if in correct order
    
    ; Swap elements
    mov [si], ah
    mov [si+1], al
    
no_swap:
    inc si
    dec ch
    jnz inner_loop
    
    pop cx                       ; Restore outer counter
    dec cl
    jnz outer_loop
    
display_result:
    ; Display output message
    lea dx, output_msg
    mov ah, 09h
    int 21h
    
    ; Display sorted even digits
    mov cl, even_count
    cmp cl, 0
    je no_even_digits
    
    lea si, even_digits
    
display_loop:
    mov dl, [si]                 ; Get digit
    mov ah, 02h                  ; Display character
    int 21h
    
    inc si
    dec cl
    jz done_display
    
    ; Display space between digits
    lea dx, space
    mov ah, 09h
    int 21h
    
    jmp display_loop
    
no_even_digits:
    ; Display message for no even digits
    mov dx, offset newline
    mov ah, 09h
    int 21h
    
done_display:
    ; Display newline
    lea dx, newline
    mov ah, 09h
    int 21h
    
    ; Exit program
    mov ah, 4ch
    int 21h
    
main endp
end main