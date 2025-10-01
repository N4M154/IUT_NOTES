
; You may customize this and other start-up templates; 
; The location of this template is c:\emu8086\inc\0_com_template.txt

ORG 0100H

.DATA

A DB 11
B DW 500
SUM DW ?

.CODE

MAIN PROC
     MOV AL,10
     MOV BL,5
     
     DIV BL
     
     MUL B
     
     ADD AX,32
     
     MOV SUM,AX
    
MAIN ENDP

END MAIN
RET



