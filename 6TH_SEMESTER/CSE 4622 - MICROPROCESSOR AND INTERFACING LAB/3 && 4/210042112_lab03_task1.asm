org 100h

.DATA
    input_string db 'We are IUT Students', 0Dh, 0Ah, '$'
    hex_suffix db 'h$'

.CODE
MAIN PROC
    mov ax, @data
    mov ds, ax
    
    ; Print string
    mov ah, 09h
    mov dx, OFFSET input_string
    int 21h

    ; Count characters
    mov si, OFFSET input_string
    xor cx, cx   ;

count_loop:
    mov al, [si]
    cmp al, '$'
    je end_count
    inc cx
    inc si
    jmp count_loop  

end_count:
    mov bx, cx ; safekeep count in BX

    ; Print high nibble
    mov al, bl
    shr al, 4
    call PRINT_HEX_DIGIT

    ; Print low nibble
    mov al, bl
    and al, 0Fh
    call PRINT_HEX_DIGIT
        
    ; Print 'h' suffix
    mov ah, 09h
    mov dx, OFFSET hex_suffix
    int 21h
        
    ; Exit to DOS
    mov ax, 4C00h
    int 21h
MAIN ENDP

PRINT_HEX_DIGIT PROC
    
    and al, 0Fh
    add al, '0'
    cmp al, '9'
    jbe ok
    add al, 7  ; Adjust for A-F
ok:
    mov dl, al
    mov ah, 02h
    int 21h
    ret
PRINT_HEX_DIGIT ENDP

END MAIN