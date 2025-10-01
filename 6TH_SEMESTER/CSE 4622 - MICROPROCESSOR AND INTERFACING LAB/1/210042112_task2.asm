
; You may customize this and other start-up templates; 
; The location of this template is c:\emu8086\inc\0_com_template.txt

ORG 0100h

.DATA 

A DB 11
B DW 500
SUM DW ?
    
.CODE 

MAIN PROC
     MOV AX,0FFFH
     MOV BX,10H
     
     MUL BX ;STAYS IN AX
     
     ADD AX,1111B
     
     MOV SUM,AX 
    
MAIN ENDP
END MAIN

RET




