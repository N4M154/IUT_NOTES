.model small
.stack 100h

.data
    prompt db 'ASCII Characters in Reverse Order:',13,10,'$'
    newline db 13,10,'$'
    counter db 0

.code
main proc
    mov ax, @data
    mov ds, ax
    
    ; Display prompt
    mov ah, 09h
    lea dx, prompt
    int 21h
    
    ; Display ASCII characters in reverse order (255 to 0)
    mov cx, 256          ; Total ASCII characters (0-255)
    mov bl, 255          ; Start from ASCII 255
    
display_loop:
    ; Display current ASCII character
    mov dl, bl
    mov ah, 02h          ; Display character function
    int 21h
    
    ; Display space after each character
    mov dl, ' '
    mov ah, 02h
    int 21h
    
    ; New line every 16 characters for better formatting
    inc counter
    mov al, counter
    and al, 0Fh          ; Check if counter % 16 == 0
    jnz no_newline
    
    mov ah, 09h
    lea dx, newline
    int 21h
    
no_newline:
    dec bl               ; Move to previous ASCII character
    loop display_loop
    
    ; Exit program
    mov ah, 4Ch
    int 21h
    
main endp
end main