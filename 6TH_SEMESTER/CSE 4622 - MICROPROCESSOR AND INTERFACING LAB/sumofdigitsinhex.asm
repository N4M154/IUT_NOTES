.model small
.stack 100h

.data
    input_msg db 'Enter 5 digits (0-9) separated by spaces: $'
    output_msg db 0dh, 0ah, 'Sum: $'
    newline db 0dh, 0ah, '$'
    
    input_digits db 5 dup(?)     ; Array to store 5 input digits
    digit_sum db 0               ; Variable to store sum

.code
main proc
    mov ax, @data
    mov ds, ax
    
    ; Display input prompt
    lea dx, input_msg
    mov ah, 09h
    int 21h
    
    ; Read 5 digits from keyboard
    mov cx, 5                    ; Counter for 5 digits
    lea si, input_digits         ; Point to input array
    mov digit_sum, 0             ; Initialize sum to 0
    
read_digits:
    ; Read character from keyboard
    mov ah, 01h
    int 21h
    
    ; Check if it's a valid digit (0-9)
    cmp al, '0'
    jb skip_char                 ; Skip if below '0'
    cmp al, '9'
    ja skip_char                 ; Skip if above '9'
    
    ; Valid digit found - store and add to sum
    mov [si], al                 ; Store the digit
    sub al, '0'                  ; Convert ASCII to numeric value
    add digit_sum, al            ; Add to running sum
    
    inc si                       ; Move to next position in array
    dec cx                       ; Decrement counter
    jz calculate_done            ; Jump if all 5 digits read
    
skip_char:
    ; Skip spaces, enter, and other non-digit characters
    cmp al, ' '                  ; Allow spaces
    je read_digits
    cmp al, 0dh                  ; Allow carriage return
    je read_digits
    cmp al, 0ah                  ; Allow line feed
    je read_digits
    jmp read_digits              ; Continue reading
    
calculate_done:
    ; Display output message
    lea dx, output_msg
    mov ah, 09h
    int 21h
    
    ; Convert sum to hexadecimal and display
    mov al, digit_sum
    call display_hex
    
    ; Display newline
    lea dx, newline
    mov ah, 09h
    int 21h
    
    ; Exit program
    mov ah, 4ch
    int 21h

main endp

; Procedure to display a byte value in hexadecimal
display_hex proc
    push ax
    push bx
    push cx
    push dx
    
    mov bl, al                   ; Save original value in BL
    
    ; Display high nibble (upper 4 bits)
    mov al, bl                   ; Get original value
    mov cl, 4                    ; Shift count
    shr al, cl                   ; Shift right 4 bits to get high nibble
    and al, 0Fh                  ; Mask to ensure only 4 bits
    call display_hex_digit       ; Display high nibble
    
    ; Display low nibble (lower 4 bits)
    mov al, bl                   ; Get original value
    and al, 0Fh                  ; Mask to get only low 4 bits
    call display_hex_digit       ; Display low nibble
    
    pop dx
    pop cx
    pop bx
    pop ax
    ret
display_hex endp

; Procedure to display a single hex digit (0-F)
display_hex_digit proc
    push ax
    push dx
    
    cmp al, 9                    ; Check if digit is 0-9 or A-F
    jbe display_numeric          ; Jump if 0-9
    
    ; Display A-F (10-15)
    add al, 'A' - 10             ; Convert 10-15 to 'A'-'F'
    jmp display_char
    
display_numeric:
    ; Display 0-9
    add al, '0'                  ; Convert 0-9 to '0'-'9'
    
display_char:
    mov dl, al                   ; Move character to DL
    mov ah, 02h                  ; Display character function
    int 21h
    
    pop dx
    pop ax
    ret
display_hex_digit endp

end main