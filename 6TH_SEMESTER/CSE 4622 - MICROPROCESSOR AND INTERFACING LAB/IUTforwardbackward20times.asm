.model small
.stack 100h

.data
    original_string db 'Islamic University of Technology', 0
    reverse_string db 32 dup(?), 0      ; Buffer for reversed string
    newline db 0dh, 0ah, '$'
    forward_counter db 10                ; Counter for forward displays
    reverse_counter db 10                ; Counter for reverse displays
    string_length dw 0                   ; Length of the string

.code
main proc
    mov ax, @data
    mov ds, ax
    
    ; Calculate string length and create reverse string
    call calculate_length
    call create_reverse_string
    
    ; Display strings alternately 20 times total
    mov cx, 20                   ; Total display count
    mov bl, 1                    ; Flag: 1 = forward, 0 = reverse
    
display_loop:
    ; Check which string to display
    test bl, 1
    jz display_reverse
    
    ; Display forward string
    cmp forward_counter, 0
    je switch_to_reverse         ; If no more forward displays left
    
    call display_forward
    dec forward_counter
    jmp continue_display
    
switch_to_reverse:
    mov bl, 0                    ; Switch to reverse only
    
display_reverse:
    ; Display reverse string
    cmp reverse_counter, 0
    je display_forward_only      ; If no more reverse displays left
    
    call display_reverse_string
    dec reverse_counter
    jmp continue_display
    
display_forward_only:
    ; Only forward displays left
    call display_forward
    dec forward_counter
    
continue_display:
    ; Toggle between forward and reverse (when both counters > 0)
    cmp forward_counter, 0
    je skip_toggle
    cmp reverse_counter, 0
    je skip_toggle
    xor bl, 1                    ; Toggle flag
    
skip_toggle:
    loop display_loop
    
    ; Exit program
    mov ah, 4ch
    int 21h

main endp

; Procedure to calculate string length
calculate_length proc
    push ax
    push si
    
    lea si, original_string
    mov string_length, 0
    
length_loop:
    mov al, [si]
    cmp al, 0                    ; Check for null terminator
    je length_done
    inc si
    inc string_length
    jmp length_loop
    
length_done:
    pop si
    pop ax
    ret
calculate_length endp

; Procedure to create reverse string
create_reverse_string proc
    push ax
    push si
    push di
    push cx
    
    ; Point to end of original string
    lea si, original_string
    add si, string_length
    dec si                       ; Point to last character
    
    ; Point to beginning of reverse string
    lea di, reverse_string
    
    ; Copy characters in reverse order
    mov cx, string_length
    
reverse_loop:
    mov al, [si]                 ; Get character from original
    mov [di], al                 ; Store in reverse string
    dec si                       ; Move backward in original
    inc di                       ; Move forward in reverse
    loop reverse_loop
    
    ; Add null terminator
    mov byte ptr [di], 0
    
    pop cx
    pop di
    pop si
    pop ax
    ret
create_reverse_string endp

; Procedure to display forward string
display_forward proc
    push ax
    push dx
    push si
    
    ; Display the original string
    lea si, original_string
    
display_forward_loop:
    mov dl, [si]
    cmp dl, 0                    ; Check for null terminator
    je forward_done
    
    mov ah, 02h                  ; Display character function
    int 21h
    
    inc si
    jmp display_forward_loop
    
forward_done:
    ; Display newline
    lea dx, newline
    mov ah, 09h
    int 21h
    
    pop si
    pop dx
    pop ax
    ret
display_forward endp

; Procedure to display reverse string
display_reverse_string proc
    push ax
    push dx
    push si
    
    ; Display the reverse string
    lea si, reverse_string
    
display_reverse_loop:
    mov dl, [si]
    cmp dl, 0                    ; Check for null terminator
    je reverse_done
    
    mov ah, 02h                  ; Display character function
    int 21h
    
    inc si
    jmp display_reverse_loop
    
reverse_done:
    ; Display newline
    lea dx, newline
    mov ah, 09h
    int 21h
    
    pop si
    pop dx
    pop ax
    ret
display_reverse_string endp

end main