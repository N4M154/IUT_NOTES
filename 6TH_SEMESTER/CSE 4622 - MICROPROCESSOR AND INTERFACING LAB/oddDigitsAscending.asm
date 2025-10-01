.model small
.stack 100h

.data
    prompt db 'Input: $'
    output_msg db 0Dh, 0Ah, 'Output: Odd Ascending: $'
    space db ' $'
    newline db 0Dh, 0Ah, '$'
    digits db 8 dup(?)      ; Array to store 8 input digits
    odd_digits db 8 dup(?)  ; Array to store odd digits
    odd_count db 0          ; Counter for odd digits

.code
main proc
    mov ax, @data
    mov ds, ax
    
    ; Display input prompt
    mov ah, 09h
    lea dx, prompt
    int 21h
    
    ; Read 8 digits from keyboard
    mov cx, 8               ; Counter for 8 digits
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
    jmp extract_odd         ; Jump to odd extraction when 8 digits collected
    
skip_input:
    ; If space or other character, just continue reading
    jmp input_loop
    
extract_odd:
    ; Extract odd digits from input
    mov cx, 8               ; Process all 8 digits
    lea si, digits          ; Point to input array
    lea di, odd_digits      ; Point to odd array
    
extraction_loop:
    mov al, [si]            ; Load current digit
    test al, 1              ; Test if least significant bit is 1 (odd check)
    jz skip_digit           ; If zero (even), skip this digit
    
    ; Store odd digit
    mov [di], al            ; Store in odd array
    inc di                  ; Move odd pointer
    inc odd_count           ; Increment odd counter
    
skip_digit:
    inc si                  ; Move to next input digit
    loop extraction_loop    ; Continue for all digits
    
    ; Sort odd digits in ascending order (Bubble Sort)
    mov cl, odd_count       ; Get number of odd digits
    cmp cl, 1               ; Check if we have more than 1 odd digit
    jle display_result      ; Skip sorting if 1 or 0 odd digits
    
    dec cl                  ; Outer loop runs (n-1) times
    mov ch, 0               ; Clear high byte
    
outer_sort_loop:
    push cx                 ; Save outer loop counter
    mov bl, cl              ; Inner loop counter
    lea si, odd_digits      ; Point to start of odd array
    
inner_sort_loop:
    mov al, [si]            ; Load first element
    mov ah, [si+1]          ; Load second element
    cmp al, ah              ; Compare them
    jle no_swap             ; Jump if first <= second (already in order)
    
    ; Swap elements
    mov [si], ah            ; Store second in first position
    mov [si+1], al          ; Store first in second position
    
no_swap:
    inc si                  ; Move to next pair
    dec bl                  ; Decrease inner counter
    jnz inner_sort_loop     ; Continue inner loop
    
    pop cx                  ; Restore outer loop counter
    loop outer_sort_loop    ; Continue outer loop
    
display_result:
    ; Display output message
    mov ah, 09h
    lea dx, output_msg
    int 21h
    
    ; Display sorted odd digits
    mov cl, odd_count       ; Load odd count
    cmp cl, 0               ; Check if any odd digits exist
    je exit_program         ; Skip if no odd digits
    
    lea si, odd_digits      ; Point to odd array
    
display_loop:
    mov al, [si]            ; Load odd digit
    add al, '0'             ; Convert to ASCII
    mov ah, 02h             ; Display character
    mov dl, al
    int 21h
    
    ; Add space after digit (except for last one)
    dec cl                  ; Decrease counter
    cmp cl, 0               ; Check if it's the last digit
    je exit_program         ; Jump to exit if last digit
    
    mov ah, 09h
    lea dx, space
    int 21h
    
    inc si                  ; Move to next odd digit
    jmp display_loop        ; Continue display loop
    
exit_program:
    ; Add final newline
    mov ah, 09h
    lea dx, newline
    int 21h
    
    ; Exit program
    mov ah, 4Ch
    int 21h
    
main endp
end main