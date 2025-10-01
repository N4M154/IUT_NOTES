.model small
.stack 100h

.data
    input_msg db 'Enter 2 digits (0-9) separated by space: $'
    output_msg db 0dh, 0ah, 'GCD: $'
    newline db 0dh, 0ah, '$'
    
    digit1 db 0                  ; First input digit
    digit2 db 0                  ; Second input digit
    gcd_result db 0              ; Result of GCD calculation

.code
main proc
    mov ax, @data
    mov ds, ax
    
    ; Display input prompt
    lea dx, input_msg
    mov ah, 09h
    int 21h
    
    ; Read first digit
    call read_digit
    mov digit1, al
    
    ; Read second digit
    call read_digit
    mov digit2, al
    
    ; Calculate GCD
    mov al, digit1               ; Load first number
    mov bl, digit2               ; Load second number
    call calculate_gcd
    mov gcd_result, al           ; Store result
    
    ; Display output message
    lea dx, output_msg
    mov ah, 09h
    int 21h
    
    ; Display GCD result
    mov al, gcd_result
    call display_decimal
    
    ; Display newline
    lea dx, newline
    mov ah, 09h
    int 21h
    
    ; Exit program
    mov ah, 4ch
    int 21h

main endp

; Procedure to read a single digit from keyboard
read_digit proc
    push dx
    
read_loop:
    ; Read character from keyboard
    mov ah, 01h
    int 21h
    
    ; Check if it's a valid digit (0-9)
    cmp al, '0'
    jb read_loop                 ; Skip if below '0'
    cmp al, '9'
    ja read_loop                 ; Skip if above '9'
    
    ; Valid digit found - convert to numeric
    sub al, '0'                  ; Convert ASCII to numeric value
    
    pop dx
    ret
read_digit endp

; Procedure to calculate GCD using Euclidean algorithm
; Input: AL = first number, BL = second number
; Output: AL = GCD
calculate_gcd proc
    push bx
    push cx
    push dx
    
    ; Handle special cases
    cmp al, 0                    ; If first number is 0
    je gcd_second_only
    cmp bl, 0                    ; If second number is 0
    je gcd_first_only
    
    ; Euclidean algorithm: GCD(a,b) = GCD(b, a mod b)
gcd_loop:
    cmp bl, 0                    ; Check if second number is 0
    je gcd_done                  ; If yes, GCD is in AL
    
    ; Calculate a mod b
    mov ah, 0                    ; Clear AH for division
    div bl                       ; AL = AL/BL, AH = AL mod BL
    
    ; Swap: a = b, b = a mod b
    mov al, bl                   ; AL = old BL
    mov bl, ah                   ; BL = remainder (old AL mod old BL)
    
    jmp gcd_loop
    
gcd_second_only:
    mov al, bl                   ; GCD is the second number
    jmp gcd_done
    
gcd_first_only:
    ; AL already contains the first number (GCD)
    jmp gcd_done
    
gcd_done:
    pop dx
    pop cx
    pop bx
    ret
calculate_gcd endp

; Procedure to display a decimal number (0-9)
display_decimal proc
    push ax
    push dx
    
    ; Since we're dealing with single digits, simple conversion
    cmp al, 9
    jbe single_digit
    
    ; For numbers > 9, we need to handle multiple digits
    mov bl, 10                   ; Divisor
    mov ah, 0                    ; Clear AH
    div bl                       ; AL = quotient, AH = remainder
    
    ; Display tens digit if not zero
    cmp al, 0
    je display_ones
    add al, '0'                  ; Convert to ASCII
    mov dl, al
    mov ah, 02h
    int 21h
    
display_ones:
    ; Display ones digit
    mov al, ah                   ; Get remainder
    
single_digit:
    add al, '0'                  ; Convert to ASCII
    mov dl, al
    mov ah, 02h                  ; Display character function
    int 21h
    
    pop dx
    pop ax
    ret
display_decimal endp

end main