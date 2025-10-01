ORG 0100h

MAIN PROC

; Show prompt
MOV AH, 2
MOV DL, '?'
INT 21h

; Read a character
MOV AH, 1
INT 21h     

 

MOV BL, AL

AND BL, 1   

;new line
MOV AH, 2
MOV DL, 0DH
INT 21h
MOV DL, 0AH
INT 21h     

CMP BL, 0
JE PRINT_E    

;odd case
MOV DL, 'O'
JMP PRINT

PRINT_E:
MOV DL, 'E'

PRINT:
MOV AH, 2
INT 21h       

; Exit to DOS
MOV AH, 4CH
INT 21h

MAIN ENDP
END MAIN
RET
