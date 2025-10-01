.model small
.stack 100h

.data
    prompt db 'Input: $'
    output_msg db 0Dh, 0Ah, 'Output: Even Digits:$'
    newline db 0Dh, 0Ah, '$'
    space db ' $'
    input_digit db ?

.code
main proc
    mov ax, @data
    mov ds, ax
    
    ; Display input prompt
    mov ah, 09h
    lea dx, prompt
    int 21h
    
    ; Read input digit
    mov ah, 01h
    int 21h
    sub al, '0'         ; Convert ASCII digit to numeric value (0-9)
    mov input_digit, al
    
    ; Display output message
    mov ah, 09h
    lea dx, output_msg
    int 21h
    
    ; Add newline after "Even Digits:"
    mov ah, 09h
    lea dx, newline
    int 21h
    
    ; Initialize counter and start finding even digits
    mov bl, 0           ; Start from 0
    mov cl, input_digit ; Load input digit for comparison
    
find_even_loop:
    ; Check if current digit is even
    mov al, bl          ; Copy current digit to AL
    test al, 1          ; Test if least significant bit is 0 (even check)
    jnz skip_digit      ; If not zero (odd), skip this digit
    
    ; Display even digit
    add al, '0'         ; Convert to ASCII
    mov ah, 02h         ; Display character function
    mov dl, al
    int 21h
    
    ; Add space after digit (except for the last one)
    mov ah, 09h
    lea dx, space
    int 21h
    
skip_digit:
    inc bl              ; Move to next digit
    cmp bl, cl          ; Compare with input digit
    jbe find_even_loop  ; Continue if current <= input digit
    
    ; Add final newline
    mov ah, 09h
    lea dx, newline
    int 21h
    
    ; Exit program
    mov ah, 4Ch
    int 21h
    
main endp
end main