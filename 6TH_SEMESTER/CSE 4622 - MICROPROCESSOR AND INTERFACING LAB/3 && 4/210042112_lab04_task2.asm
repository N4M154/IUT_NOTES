;210042112
org 100h
.data
    a db 1, 2, 3, 4, 5, 6, 7, 8, 9
    b db 00h
    message db 'input: The value of n in between 2 ~ 9: $'
    result db 'the result is: $'  
.code
main proc
    mov ax, @data
    mov ds, ax
    xor ax, ax
    mov si, offset a ;at the start of a 
    mov di, offset b ;at the start of b
    ;display msg
    mov dx, offset message
    mov ah, 09h
    int 21h  
    ;read a character
    mov ah, 01h
    int 21h  
    ;convert to decimal
    mov cl, al
    sub cl, 48
    xor bx, bx  
        
    loop_1:
        mov ax, [si]
        imul ax  
        mov ah, 0
        add bx, ax
        inc si
    loop loop_1
     
    ;new line -> CR+LF
    mov ah, 02h   
    mov dl, 0Dh     
    int 21h       
    mov dl, 0Ah     
    int 21h  
    
    ;result msg
    mov di, offset b
    mov dx, offset result
    mov ah, 09h
    int 21h
    
    ;number to string conversion
    mov ah, 0 
    mov ax, bx
    mov dx, 0
    mov bx, 10
    mov cx, 0

    l1:
        div bx
        push dx 
        mov ah, 0
        mov dx, 0
        inc cx
        cmp ax, 0
        jne l1
        mov ah, 02h
    l2:
        pop dx
        add dx, '0'
        int 21h
        loop l2
    
main endp
end main
ret