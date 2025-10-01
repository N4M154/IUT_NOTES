.model small
.stack 100h

.data
    prompt1 db 'Input Alphabet: $'
    prompt2 db 0Dh, 0Ah, 'Given Value N: $'
    output_msg db 0Dh, 0Ah, 'Output: $'
    input_char db ?
    input_num db ?
    result_char db ?

.code
main proc
    mov ax, @data
    mov ds, ax
    
    ; Display prompt for alphabet input
    mov ah, 09h
    lea dx, prompt1
    int 21h
    
    ; Read alphabet character
    mov ah, 01h
    int 21h
    mov input_char, al
    
    ; Display prompt for number input
    mov ah, 09h
    lea dx, prompt2
    int 21h
    
    ; Read number (0-9)
    mov ah, 01h
    int 21h
    sub al, '0'        ; Convert ASCII digit to numeric value
    mov input_num, al
    
    ; Process the input character
    mov al, input_char
    mov bl, input_num
    
    ; Check if input is uppercase (A-Z)
    cmp al, 'A'
    jb invalid_input
    cmp al, 'Z'
    ja check_lowercase
    
    ; Handle uppercase letters
    sub al, 'A'        ; Convert to 0-25 range
    add al, bl         ; Add the offset N
    cmp al, 25         ; Check if it exceeds Z
    ja wrap_uppercase
    add al, 'A'        ; Convert back to ASCII
    jmp display_result
    
wrap_uppercase:
    sub al, 26         ; Wrap around (A=0, so subtract 26)
    add al, 'A'
    jmp display_result
    
check_lowercase:
    ; Check if input is lowercase (a-z)
    cmp al, 'a'
    jb invalid_input
    cmp al, 'z'
    ja invalid_input
    
    ; Handle lowercase letters
    sub al, 'a'        ; Convert to 0-25 range
    add al, bl         ; Add the offset N
    cmp al, 25         ; Check if it exceeds z
    ja wrap_lowercase
    add al, 'a'        ; Convert back to ASCII
    jmp display_result
    
wrap_lowercase:
    sub al, 26         ; Wrap around
    add al, 'a'
    jmp display_result
    
display_result:
    mov result_char, al
    
    ; Display output message
    mov ah, 09h
    lea dx, output_msg
    int 21h
    
    ; Display result character
    mov ah, 02h
    mov dl, result_char
    int 21h
    
    jmp exit_program
    
invalid_input:
    ; Handle invalid input (optional)
    mov ah, 09h
    lea dx, output_msg
    int 21h
    mov ah, 02h
    mov dl, '?'
    int 21h
    
exit_program:
    ; Add newline for better formatting
    mov ah, 02h
    mov dl, 0Dh
    int 21h
    mov dl, 0Ah
    int 21h
    
    ; Exit program
    mov ah, 4Ch
    int 21h
    
main endp
end main