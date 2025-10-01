.model small
.stack 100h

.data
    digits_forward_msg db 'DIGITS FORWARD: $'
    digits_reverse_msg db 'DIGITS REVERSE: $'
    upper_forward_msg db 'UPPERCASE FORWARD: $'
    upper_reverse_msg db 'UPPERCASE REVERSE: $'
    lower_forward_msg db 'LOWERCASE FORWARD: $'
    lower_reverse_msg db 'LOWERCASE REVERSE: $'
    newline db 0dh, 0ah, '$'
    space db ' $'

.code
main proc
    mov ax, @data
    mov ds, ax
    
    ; Display digits in forward order
    lea dx, digits_forward_msg
    mov ah, 09h
    int 21h
    
    mov dl, '0'                  ; Start from '0' (ASCII 48)
    mov cx, 10                   ; 10 digits (0-9)
    
digits_forward_loop:
    mov ah, 02h                  ; Display character function
    int 21h
    
    ; Display space between characters
    push dx
    lea dx, space
    mov ah, 09h
    int 21h
    pop dx
    
    inc dl                       ; Move to next digit
    loop digits_forward_loop
    
    ; Display newline
    lea dx, newline
    mov ah, 09h
    int 21h
    
    ; Display digits in reverse order
    lea dx, digits_reverse_msg
    mov ah, 09h
    int 21h
    
    mov dl, '9'                  ; Start from '9' (ASCII 57)
    mov cx, 10                   ; 10 digits (9-0)
    
digits_reverse_loop:
    mov ah, 02h                  ; Display character function
    int 21h
    
    ; Display space between characters
    push dx
    lea dx, space
    mov ah, 09h
    int 21h
    pop dx
    
    dec dl                       ; Move to previous digit
    loop digits_reverse_loop
    
    ; Display newline
    lea dx, newline
    mov ah, 09h
    int 21h
    
    ; Display uppercase letters in forward order
    lea dx, upper_forward_msg
    mov ah, 09h
    int 21h
    
    mov dl, 'A'                  ; Start from 'A' (ASCII 65)
    mov cx, 26                   ; 26 letters (A-Z)
    
upper_forward_loop:
    mov ah, 02h                  ; Display character function
    int 21h
    
    ; Display space between characters
    push dx
    lea dx, space
    mov ah, 09h
    int 21h
    pop dx
    
    inc dl                       ; Move to next letter
    loop upper_forward_loop
    
    ; Display newline
    lea dx, newline
    mov ah, 09h
    int 21h
    
    ; Display uppercase letters in reverse order
    lea dx, upper_reverse_msg
    mov ah, 09h
    int 21h
    
    mov dl, 'Z'                  ; Start from 'Z' (ASCII 90)
    mov cx, 26                   ; 26 letters (Z-A)
    
upper_reverse_loop:
    mov ah, 02h                  ; Display character function
    int 21h
    
    ; Display space between characters
    push dx
    lea dx, space
    mov ah, 09h
    int 21h
    pop dx
    
    dec dl                       ; Move to previous letter
    loop upper_reverse_loop
    
    ; Display newline
    lea dx, newline
    mov ah, 09h
    int 21h
    
    ; Display lowercase letters in forward order
    lea dx, lower_forward_msg
    mov ah, 09h
    int 21h
    
    mov dl, 'a'                  ; Start from 'a' (ASCII 97)
    mov cx, 26                   ; 26 letters (a-z)
    
lower_forward_loop:
    mov ah, 02h                  ; Display character function
    int 21h
    
    ; Display space between characters
    push dx
    lea dx, space
    mov ah, 09h
    int 21h
    pop dx
    
    inc dl                       ; Move to next letter
    loop lower_forward_loop
    
    ; Display newline
    lea dx, newline
    mov ah, 09h
    int 21h
    
    ; Display lowercase letters in reverse order
    lea dx, lower_reverse_msg
    mov ah, 09h
    int 21h
    
    mov dl, 'z'                  ; Start from 'z' (ASCII 122)
    mov cx, 26                   ; 26 letters (z-a)
    
lower_reverse_loop:
    mov ah, 02h                  ; Display character function
    int 21h
    
    ; Display space between characters
    push dx
    lea dx, space
    mov ah, 09h
    int 21h
    pop dx
    
    dec dl                       ; Move to previous letter
    loop lower_reverse_loop
    
    ; Display final newline
    lea dx, newline
    mov ah, 09h
    int 21h
    
    ; Exit program
    mov ah, 4ch
    int 21h
    
main endp
end main