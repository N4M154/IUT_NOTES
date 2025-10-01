.model small
.stack 100h

.data
    prompt db 'Input: $'
    output_msg db 0Dh, 0Ah, 'Output: $'
    input_str db 6 dup(?)    ; 5 characters + null terminator
    output_str db 6 dup(?)   ; 5 characters + null terminator

.code
main proc
    mov ax, @data
    mov ds, ax
    
    ; Display input prompt
    mov ah, 09h
    lea dx, prompt
    int 21h
    
    ; Read 5 characters from keyboard
    mov cx, 5           ; Counter for 5 characters
    lea si, input_str   ; Point to input buffer
    
input_loop:
    mov ah, 01h         ; Read character
    int 21h
    mov [si], al        ; Store character
    inc si              ; Move to next position
    loop input_loop     ; Repeat for 5 characters
    
    ; Null terminate the input string
    mov byte ptr [si], '$'
    
    ; Convert to uppercase and reverse
    lea si, input_str   ; Point to start of input string
    lea di, output_str  ; Point to start of output string
    add si, 4           ; Point to last character (5th character, 0-indexed)
    
    mov cx, 5           ; Counter for 5 characters
    
convert_loop:
    mov al, [si]        ; Get character from input
    
    ; Convert lowercase to uppercase
    cmp al, 'a'         ; Check if >= 'a'
    jb store_char       ; If not lowercase, store as is
    cmp al, 'z'         ; Check if <= 'z'
    ja store_char       ; If not lowercase, store as is
    sub al, 32          ; Convert to uppercase (subtract 32)
    
store_char:
    mov [di], al        ; Store converted character
    dec si              ; Move backward in input string
    inc di              ; Move forward in output string
    loop convert_loop   ; Repeat for all 5 characters
    
    ; Null terminate output string
    mov byte ptr [di], '$'
    
    ; Display output message
    mov ah, 09h
    lea dx, output_msg
    int 21h
    
    ; Display reversed uppercase string
    mov ah, 09h
    lea dx, output_str
    int 21h
    
    ; Add final newline
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