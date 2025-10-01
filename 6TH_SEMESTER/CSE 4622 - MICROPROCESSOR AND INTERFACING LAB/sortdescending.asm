.model small
.stack 100h

.data
    prompt db 'Input: $'
    output_msg db 0Dh, 0Ah, 'Output: Descending: $'
    space db ' $'
    newline db 0Dh, 0Ah, '$'
    digits db 5 dup(?)      ; Array to store 5 digits

.code
main proc
    mov ax, @data
    mov ds, ax
    
    ; Display input prompt
    mov ah, 09h
    lea dx, prompt
    int 21h
    
    ; Read 5 digits from keyboard
    mov cx, 5               ; Counter for 5 digits
    lea si, digits          ; Point to digits array
    
input_loop:
    mov ah, 01h             ; Read character
    int 21h
    
    ; Check if it's a digit (0-9)
    cmp al, '0'
    jb skip_input           ; Skip if less than '0'
    cmp al, '9'
    ja skip_input           ; Skip if greater than '9'
    
    sub al, '0'             ; Convert ASCII to numeric value
    mov [si], al            ; Store digit
    inc si                  ; Move to next position
    dec cx                  ; Decrease counter
    jnz input_loop          ; Continue if more digits needed
    jmp sort_digits         ; Jump to sorting when 5 digits collected
    
skip_input:
    ; If space or other character, just continue reading
    jmp input_loop
    
sort_digits:
    ; Bubble sort implementation for descending order
    mov cx, 4               ; Outer loop: n-1 passes (4 passes for 5 elements)
    
outer_loop:
    push cx                 ; Save outer loop counter
    mov cx, 4               ; Inner loop: compare adjacent elements
    lea si, digits          ; Point to start of array
    
inner_loop:
    mov al, [si]            ; Load first element
    mov bl, [si+1]          ; Load second element
    cmp al, bl              ; Compare them
    jge no_swap             ; Jump if first >= second (already in descending order)
    
    ; Swap elements
    mov [si], bl            ; Store second in first position
    mov [si+1], al          ; Store first in second position
    
no_swap:
    inc si                  ; Move to next pair
    loop inner_loop         ; Continue inner loop
    
    pop cx                  ; Restore outer loop counter
    loop outer_loop         ; Continue outer loop
    
    ; Display output message
    mov ah, 09h
    lea dx, output_msg
    int 21h
    
    ; Display sorted digits
    mov cx, 5               ; Counter for 5 digits
    lea si, digits          ; Point to sorted array
    
display_loop:
    mov al, [si]            ; Load digit
    add al, '0'             ; Convert to ASCII
    mov ah, 02h             ; Display character
    mov dl, al
    int 21h
    
    ; Add space after digit (except for last one)
    cmp cx, 1               ; Check if it's the last digit
    je skip_space           ; Skip space for last digit
    mov ah, 09h
    lea dx, space
    int 21h
    
skip_space:
    inc si                  ; Move to next digit
    loop display_loop       ; Continue for all digits
    
    ; Add final newline
    mov ah, 09h
    lea dx, newline
    int 21h
    
    ; Exit program
    mov ah, 4Ch
    int 21h
    
main endp
end main