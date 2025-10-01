.model small
.stack 100h

.data
    prompt db 'Input: $'
    odd_msg db 0Dh, 0Ah, 'Output: Odd: $'
    even_msg db 0Dh, 0Ah, 'Even: $'
    space db ' $'
    newline db 0Dh, 0Ah, '$'
    digits db 5 dup(?)      ; Array to store 5 input digits
    odd_digits db 5 dup(?)  ; Array to store odd digits
    even_digits db 5 dup(?) ; Array to store even digits
    odd_count db 0          ; Counter for odd digits
    even_count db 0         ; Counter for even digits

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
    jmp separate_digits     ; Jump to separation when 5 digits collected
    
skip_input:
    ; If space or other character, just continue reading
    jmp input_loop
    
separate_digits:
    ; Separate odd and even digits
    mov cx, 5               ; Process all 5 digits
    lea si, digits          ; Point to input array
    lea di, odd_digits      ; Point to odd array
    lea bx, even_digits     ; Point to even array
    
separation_loop:
    mov al, [si]            ; Load current digit
    test al, 1              ; Test if least significant bit is 1 (odd check)
    jz store_even           ; If zero (even), store in even array
    
    ; Store odd digit
    mov [di], al            ; Store in odd array
    inc di                  ; Move odd pointer
    inc odd_count           ; Increment odd counter
    jmp next_digit
    
store_even:
    ; Store even digit
    mov [bx], al            ; Store in even array
    inc bx                  ; Move even pointer
    inc even_count          ; Increment even counter
    
next_digit:
    inc si                  ; Move to next input digit
    loop separation_loop    ; Continue for all digits
    
    ; Display odd digits
    mov ah, 09h
    lea dx, odd_msg
    int 21h
    
    ; Display odd digits if any exist
    mov cl, odd_count       ; Load odd count
    cmp cl, 0               ; Check if any odd digits exist
    je display_even         ; Skip if no odd digits
    
    lea si, odd_digits      ; Point to odd array
    
display_odd_loop:
    mov al, [si]            ; Load odd digit
    add al, '0'             ; Convert to ASCII
    mov ah, 02h             ; Display character
    mov dl, al
    int 21h
    
    ; Add space after digit (except for last one)
    dec cl                  ; Decrease counter
    cmp cl, 0               ; Check if it's the last digit
    je display_even         ; Jump to even display if last odd digit
    
    mov ah, 09h
    lea dx, space
    int 21h
    
    inc si                  ; Move to next odd digit
    jmp display_odd_loop    ; Continue odd display loop
    
display_even:
    ; Display even digits
    mov ah, 09h
    lea dx, even_msg
    int 21h
    
    ; Display even digits if any exist
    mov cl, even_count      ; Load even count
    cmp cl, 0               ; Check if any even digits exist
    je exit_program         ; Skip if no even digits
    
    lea si, even_digits     ; Point to even array
    
display_even_loop:
    mov al, [si]            ; Load even digit
    add al, '0'             ; Convert to ASCII
    mov ah, 02h             ; Display character
    mov dl, al
    int 21h
    
    ; Add space after digit (except for last one)
    dec cl                  ; Decrease counter
    cmp cl, 0               ; Check if it's the last digit
    je exit_program         ; Jump to exit if last even digit
    
    mov ah, 09h
    lea dx, space
    int 21h
    
    inc si                  ; Move to next even digit
    jmp display_even_loop   ; Continue even display loop
    
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